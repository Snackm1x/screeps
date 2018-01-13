var roomFunctions = {
    findLowEnergySpawns: function(room){
         return room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity;
                }
         }
    },
    
    findConstructionSitesByPriority: function(room) {
        //something something get priority (like build cool things before roads, etc)
        return room.find(FIND_MY_CONSTRUCTION_SITES)
    },
};

module.exports = roomFunctions;