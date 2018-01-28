var roomInit = {
    
    init: function(room){
        if (room){
            if (!room.memory.init){
                this.initCreeps(room);
                this.initSources(room);
                this.initMiningContainers(room);
                room.memory.init = true;
            }
        }
    },
    
    initCreeps: function(room){
        let harvesterCount = room.find(FIND_SOURCES).length * 2;
        let upgraderCount = 2;
        room.memory.harvestersMax = 4;
        room.memory.upgradersMax = upgraderCount;
        room.memory.harvesters = 0;
        room.memory.upgraders = 0;
    },
    
    initSources: function(room){
        if (!room.memory.sources){
            room.memory.sources = {};
            var sources = room.find(FIND_SOURCES);
            for (var i in sources){
                var source = sources[i];
                source.memory = room.memory.sources[source.id] = {};
            }
        }
    },
    
    initMiningContainers: function(room){
        let roomSpawns = room.find(FIND_STRUCTURES, {
                         filter: (structure) => {
                             return (structure.structureType == STRUCTURE_SPAWN);
                         }
                         });
        
        if (roomSpawns){
            room.memory.miningContainers = [];
            let mySpawn = roomSpawns[0];
            let sources = room.find(FIND_SOURCES);
            for (var i in sources){
                let mySource = sources[i];
                let myPath = room.findPath(mySpawn.pos, mySource.pos);
                // We -2 because the last object in the path is our actual target
                let mySpot = myPath[myPath.length - 2];
                room.memory.miningContainers.push(mySpot);
            }
        }
    },
};
module.exports = roomInit;