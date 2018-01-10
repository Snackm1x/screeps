var roomManager = require('room.manager');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) { 
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo((sources), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            var filteredTarget = creep.pos.findClosestByRange(targets);
            if(filteredTarget) {
                if(creep.transfer(filteredTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(filteredTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    var sources = roomManager.getSources(creep.room);
                    //console.log("Sources from Creep : " + sources);
                    for (var i in sources){
                        var source = sources[i];
                        //console.log(source.memory.maxWorkers);
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester; 