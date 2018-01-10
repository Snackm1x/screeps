var CreepCounts = require('room.creepcounts');
var roomManager = require('room.manager');
var roles = require('role.enums');

var creepSpawner = {
    
    /** @param {Spawn} spawn **/
    run: function(spawns) {
        for (var i in spawns){
            var spawn = spawns[i]
            this.checkUnitCounts(spawn);
        }
    },
    
    checkUnitCounts: function(spawn){
        this.getPriority(spawn);
    },
    
    getPriority: function(spawn) {
        console.log(roles.HARVESTER);
        if(this.getHarvesterPriority(spawn, roles.HARVESTER)){
            console.log('asdfasdfas');
            var harvester = this.spawnHarvester(spawn, roles.HARVESTER);
            var counter = spawn.room.memory.creepCounts;
            counter.harvestersMax++;
            spawn.room.memory.creepCounts.harvesters = counter;
        }else{
            if (this.getUpgraderPriority(spawn, roles.UPGRADER)){
                var upgrader = this.spawnSmallWorker(roles.UPGRADER);
                var counter = spawn.room.memory.creepCounts;
                counter.upgradersMax++;
                spawn.room.memory.creepCounts.upgraders = counter;
            }
            if (this.getBuilderPriority(spawn, roles.BUILDER)){
                var builder = this.spawnSmallWorker(roles.BUILDER);
                var counter = spawn.room.memory.creepCounts;
                counter.buildersMax++;
                spawn.room.memory.creepCounts.builders = counter;
            }
        }
    },
    
    getHarvesterPriority: function(spawn){
        var harvesters = this.filterCreepsForRole(spawn, 'harvester');
        //return harvesters.length < spawn.room.memory.creepCounts.harvestersMax;
        return harvesters.length < 5;
    },
    
    setHarvesterSource: function(harvester){
        if (!harvester.memory.energySource){
            harvester.memory.energySource = {};
            var sources = room.find(FIND_SOURCES, {
                                filter: (source) => {
                                    return (source.memory.workers < source.memory.maxWorkers)
                                }
                             });
            console.log(sources);
        }
        
    },
    
    getUpgraderPriority: function(spawn){
        var upgraders = this.filterCreepsForRole(spawn, 'upgrader');
        //return upgraders.length < spawn.room.memory.creepCounts.upgradersMax;
        return upgraders.length < 2;
    },
    
    getBuilderPriority: function(spawn){
        var builders = this.filterCreepsForRole(spawn, 'builder');
        //return builders.length < spawn.room.memory.creepCounts.buildersMax;
        return builders.length < 2;
    },
    
    filterCreepsForRole: function(spawn, sRole){
        var room = spawn.room;
        return room.find(FIND_MY_CREEPS,{ 
                        filter: (creep) => {
                            return (creep.memory.role == sRole);  
                        }
          });
    },
    
    spawnSmallWorker: function(role) {
        var newName = role + Game.time;
        var unit = Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: role, class: 'worker'}});
        return unit;
    },
    
    spawnHarvester: function(spawn, role){
        var newName = role + Game.time;
        var unit = spawn.spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: role, class: 'worker'}});
        return unit;
    },
    
    debug: function(word, obj){
        console.log(word + ": " + obj);
    }
};

module.exports = creepSpawner;