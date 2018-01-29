var roomFunctions = {
    getRoomSpawns: function(room) {
        let mySpawns = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_SPAWN);
        return mySpawns;
    },
    
    getFirstSpawn: function(room){
        let mySpawns = room.memory.roomSpawns;
        var mySpawn = {};
        for (var i in mySpawns){
            mySpawn = Game.getObjectById(i);
            return mySpawn;
        }
    }
};

module.exports = roomFunctions;