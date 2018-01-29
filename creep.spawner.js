var roomFunctions = require('room.sharedFunctions');

var creepSpawner = {
    
    determineSpawn: function(room){
        let screeps = room.memory.screeps;
        if (screeps.shouldSpawn){
            this.newRoomSpawn(room);
            //get priority of what we need and spawn that instead
            if (room.controller.level >= 2){
                if (screeps.useLargerScreeps){
                    // if (this.getMinerPriority(room)){
                    //     this.spawnMiner(room.memory.roomSpawns[0]);
                    // }
                } else {
                    let mySpawn = roomFunctions.getFirstSpawn(room);
                    let screeps = room.memory.screeps
                    
                    if (screeps.harvesters < screeps.harvestersMax){
                        this.spawnBasic(mySpawn, "harvester", "worker");
                    }
                    if (screeps.upgraders < screeps.upgradersMax){
                        this.spawnBasic(mySpawn, "upgrader", "worker");
                    } 
                    
                    if (room.memory.buildingSites > 0 && screeps.builders < screeps.buildersMax){
                        let mySpawn = roomFunctions.getFirstSpawn(room);
                        this.spawnBasic(mySpawn, "builder", "worker");
                    }
                }
            }
        }
    },
    
    newRoomSpawn: function(room) {
        if (room.controller.level == 1){
            let mySpawn = roomFunctions.getFirstSpawn(room);
            let screeps = room.memory.screeps
            
            if (screeps.harvesters < screeps.harvestersMax){
                this.spawnBasic(mySpawn, "harvester", "worker");
            } else if (screeps.upgraders < screeps.upgradersMax){
                this.spawnBasic(mySpawn, "upgrader", "worker");
            } 
        }  
    },
    
    getMinerPriority: function(room){
        var containers = room.memory.miningContainers;
        var emptyContainers = _.filter(containers, (container) => container.memory.worker == false);
        
        if(emptyContainers.length > 0 && emptyContainers != ""){
            return true;
            this.spawnMiner(room.memory.roomSpawns[0]);
        } else {
            return false;
        }
        
    },
   
    spawnLarger: function(spawn, role, classType){
        var newName = role + Game.time;
        var unit = spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: role, class: classType}});
                return unit;
    },
    
    spawnBasic: function(spawn, role, classType){
        var newName = role + Game.time;
        var unit = spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: role, class: classType}});
                return unit;
    },
    
    spawnMiner: function(spawn){
        var newName = "miner" + Game.time;
        var unit = spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
                {memory: {role: "miner", class: "worker"}});
                return unit;
    },
    
};

module.exports = creepSpawner;