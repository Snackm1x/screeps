var roleSharedFunctions = {
    
    gatherEnergy: function(creep){
        if (creep.room.controller.level <= 1){
            return this.getRoomSpawns(creep);
        } else{
            var targets = this.getEnergyFromStorage(creep);
            if(targets != ""){
                return targets;
            } else {
                let screeps = creep.room.memory.screeps;
                if (!screeps.shouldSpawn){
                    return this.getRoomSpawns(creep);
                }
            }
        }
    },
    
    getEnergyFromStorage: function(creep){
        var extensions = this.getRoomExtensions(creep);
        var containers = this.getRoomContainers(creep);
        if (containers.length > 0){
            return containers;
        } else {
            return extensions;
        }
    },
    
    getRoomExtensions: function(creep) {
        let extensions = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.energy > 0);
        return extensions;
    },
    
    getRoomContainers: function(creep) {
        let containers = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
        return containers;
    },
    
    getRoomSpawns: function(creep) {
        let mySpawns = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_SPAWN);
        return mySpawns;
    },
    
    getFullSpawns: function(creep) {
        let mySpawns = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_SPAWN && structure.energy > 250);
        return mySpawns;
    },
    
    withdrawEnergyFromTarget: function(creep, target) {
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
           creep.moveTo(target);
        }
    },
};

module.exports = roleSharedFunctions;