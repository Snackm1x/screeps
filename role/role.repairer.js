var sharedFunctions = require('role.sharedFunctions');

var roleRepairer = {
    run: function(creep) {
        
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('✌️ ️repair');
        }
        
        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax;
                }
            })
            targets.sort((a,b) => a.hits - b.hits);
            if(targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            var targets = sharedFunctions.findEnergyFromAnywhere(creep);
            var target = creep.pos.findClosestByPath(targets);
            sharedFunctions.withdrawEnergyFromTarget(creep, target);
        }
    }
};

module.exports = roleRepairer;