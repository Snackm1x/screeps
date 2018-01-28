var roomFunctions = {
    getRoomSpawns: function(room) {
        let mySpawns = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_SPAWN);
        return mySpawns;
    },
};

module.exports = roomFunctions;