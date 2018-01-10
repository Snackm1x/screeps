var sharedFunctions = require('role.sharedFunctions');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            var targets = sharedFunctions.findEnergyFromAnywhere(creep);
            var target = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE || creep.pos.isNearTo(creep.room.controller) == false) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;