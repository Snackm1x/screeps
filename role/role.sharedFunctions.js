var roleSharedFunctions = {
    
    findEnergyFromAnywhere: function(creep){
       if (creep.room.energyAvailable >= (creep.room.energyCapacityAvailable / 2)){
            return targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                           structure.structureType == STRUCTURE_SPAWN || 
                           structure.structureType == STRUCTURE_CONTAINER) && 
                           structure.energy > 0;
               }
           });
       }else {
            return this.getEnergyTargetsExtensions(creep);
       }
    },
    
    getEnergyTargetsExtensions: function(creep) {
        return targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy > 0;
                    }
            });
    },
    
    withdrawEnergyFromTarget: function(creep, target) {
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
           creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleSharedFunctions;