var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let shouldHarvest = creep.carry[RESOURCE_ENERGY] < creep.carryCapacity;
        
        if(shouldHarvest) { 
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo((sources), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var roomSpawns = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity;
                }
            })
            if (roomSpawns.length >= 1){
                if(creep.transfer(roomSpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomSpawns[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
                    }
                });
                
                var filteredTarget = creep.pos.findClosestByRange(targets);
                
                if(filteredTarget) {
                    if(creep.transfer(filteredTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(filteredTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
            }
            
        }
    },
};

module.exports = roleHarvester; 