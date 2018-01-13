var sharedFunctions = require('role.sharedFunctions');

var roleRunner = {
    run: function(creep){
        if (creep.carry.energy == 0){
            var targets = sharedFunctions.getEnergyFromContainers(creep);
            var target = creep.pos.findClosestByPath(targets);
            if (target){
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } 
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER &&
                            structure.energy < structure.energyCapacity);
                    }
            });
            var filteredTarget = creep.pos.findClosestByRange(targets);
            
            if(filteredTarget) {
                if(creep.transfer(filteredTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(filteredTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    },
};

module.exports = roleRunner;