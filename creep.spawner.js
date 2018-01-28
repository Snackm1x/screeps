var creepSpawner = {
    
    determineSpawn: function(room){
        this.newRoomSpawn(room);
        //get priority of what we need and spawn that instead
    },
    
    newRoomSpawn: function(room) {
        if (room.controller.level == 1){
           let roomSpawns = room.find(FIND_STRUCTURES, {
                         filter: (structure) => {
                             return (structure.structureType == STRUCTURE_SPAWN);
                         }
                         });
            let mySpawn = roomSpawns[0];
            if (room.memory.harvesters < room.memory.harvestersMax){
                this.spawnBasic(mySpawn, "harvester", "worker");
            } else if (room.memory.upgraders < room.memory.upgradersMax){
                this.spawnBasic(mySpawn, "upgrader", "worker");
            } 
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
    }
    
};

module.exports = creepSpawner;