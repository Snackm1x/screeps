var sharedFunctions = require('role.sharedFunctions');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let shouldHarvest = creep.carry[RESOURCE_ENERGY] < creep.carryCapacity;
        
        if(shouldHarvest) { 
            this.harvestClosestSource(creep);
        }
        else {
            let roomSpawns = sharedFunctions.getRoomSpawns(creep);
            if (roomSpawns.length >= 1){
                this.transferEnergy(creep, roomSpawns[0]);
            } else {
                let extensions = sharedFunctions.getRoomExtensions(creep);
                var filteredTarget = creep.pos.findClosestByRange(extensions);
                
                if(filteredTarget) {
                    this.transferEnergy(creep, filteredTarget);
                } 
            }
            
        }
    },
    
    harvestClosestSource: function(creep){
        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources);
        }
    },
    
    transferEnergy: function(creep, target){
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
};

module.exports = roleHarvester; 