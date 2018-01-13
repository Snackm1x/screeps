var CreepCounts = require('room.creepcounts');
var roomManager = require('room.manager');
var roles = require('creep.roles');
var classTypes = require('class.types');

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
        if(this.getHarvesterPriority(spawn, roles.HARVESTER)){
            var harvester = this.spawnHarvester(spawn, roles.HARVESTER, classTypes.WORKER);
        }else{
            if (this.getRepairerPriority(spawn, roles.REPAIRER)){
                var repairer = this.spawnHarvester(spawn, roles.REPAIRER, classTypes.WORKER);
            }
            if (this.getRunnerPriority(spawn, roles.RUNNER)){
                var repairer = this.spawnHarvester(spawn, roles.RUNNER, classTypes.WORKER);
            }
            if (this.getUpgraderPriority(spawn, roles.UPGRADER)){
                var upgrader = this.spawnHarvester(spawn, roles.UPGRADER, classTypes.WORKER);
            }
            if (this.getBuilderPriority(spawn, roles.BUILDER)){
                var builder = this.spawnHarvester(spawn, roles.BUILDER, classTypes.WORKER);
            }
        }
    },
    
    getHarvesterPriority: function(spawn){
        var harvesters = this.filterCreepsForRole(spawn, roles.HARVESTER);
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
        }
        
    },
    
    getUpgraderPriority: function(spawn){
        var upgraders = this.filterCreepsForRole(spawn, roles.UPGRADER);
        //return upgraders.length < spawn.room.memory.creepCounts.upgradersMax;
        return upgraders.length < 2;
    },
    
    getRunnerPriority: function(spawn){
        var runners = this.filterCreepsForRole(spawn, roles.RUNNER);
        //return upgraders.length < spawn.room.memory.creepCounts.upgradersMax;
        return runners.length < 1;
    },
    
    getRepairerPriority: function(spawn){
        var repairers = this.filterCreepsForRole(spawn, roles.REPAIRER);
        //return upgraders.length < spawn.room.memory.creepCounts.upgradersMax;
        return repairers.length < 1;
    },
    
    getBuilderPriority: function(spawn){
        var builders = this.filterCreepsForRole(spawn, roles.BUILDER);
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
    
    spawnHarvester: function(spawn, role, classType){
        var newName = role + Game.time;
        var largeCost = BODYPART_COST.work * 2 + BODYPART_COST.carry * 2 + BODYPART_COST.move;
        if (spawn.room.energyAvailable > largeCost){
            this.spawnLarger(spawn, role, classType);
        }
        // console.log(spawn.room.energyAvailable);
        // if (spawn.room.energyAvailable > largeCost){
        //     var unit = spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
        //         {memory: {role: role, class: classType}});
        //         return unit
        // } else {
        //     var unit = spawn.spawnCreep([WORK,CARRY,MOVE], newName,
        //         {memory: {role: role, class: classType}});
        //     return unit;
        // }
    },
    
    spawnLarger: function(spawn, role, classType){
        var newName = role + Game.time;
        var unit = spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: role, class: classType}});
                return unit
    }
    
};

module.exports = creepSpawner;