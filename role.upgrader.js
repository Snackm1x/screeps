var sharedFunctions = require('role.sharedFunctions');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        
        if(creep.memory.upgrading) {
            this.moveOrUpgrade(creep);
        }
        else {
            var targets = sharedFunctions.gatherEnergy(creep);
            this.withdrawEnergyFromClosest(creep, targets);
        }
    },
    
    withdrawEnergyFromClosest: function(creep, targets){
        if(targets){
            var target = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
    
    moveOrUpgrade: function(creep){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    },
};

module.exports = roleUpgrader;