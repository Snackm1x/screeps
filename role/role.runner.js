var roleRunner = {
    run: function(creep){
        var spawn = Game.spawns["Spawn1"];
        
        if (creep.carry.energy == 0){
            if (spawn.energy >= 225){
                if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } 
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < 50;
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