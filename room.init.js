var roomFunctions = require('room.sharedFunctions');

var roomInit = {
    
    init: function(room){
        if (room){
            if (!room.memory.init){
                this.initCreeps(room);
                this.initSources(room);
                this.initMiningContainers(room);
                this.initSpawns(room);
                room.memory.init = true;
            }
        }
    },
    
    initCreeps: function(room){
        if(!room.memory.screeps){
            room.memory.screeps = {};
            let screeps = room.memory.screeps;
            screeps.harvestersMax = 4;
            screeps.upgradersMax = 2;
            screeps.buildersMax = 2;
            screeps.harvesters = 0;
            screeps.upgraders = 0;
            screeps.builders = 0;
            screeps.useLargerScreeps = false;
        }
    },
    
    initSpawns: function(room){
        if (!room.memory.roomSpawns){
            room.memory.roomSpawns = {};
            let roomSpawns = roomFunctions.getRoomSpawns(room);
            for (var i in roomSpawns){
                let roomSpawn = roomSpawns[i];
                roomSpawn.memory = room.memory.roomSpawns[roomSpawn.id] = {};
            }
        }
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
        let roomSpawns = roomFunctions.getRoomSpawns(room);
        
        if (roomSpawns){
            room.memory.miningContainers = [];
            let mySpawn = roomSpawns[0];
            let sources = room.find(FIND_SOURCES);
            for (var i in sources){
                let mySource = sources[i];
                let myPath = room.findPath(mySpawn.pos, mySource.pos);
                // We -2 because the last object in the path is our actual target
                let mySpot = myPath[myPath.length - 2];
                let myContainer = { position: mySpot, miningSource: mySource.id, worker: false }
                room.memory.miningContainers.push(myContainer);
            }
        }
    },
};
module.exports = roomInit;