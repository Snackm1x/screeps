var tFighter = require('tower.fighter');
var creepCounts = require('room.creepcounts');

var roomManager = {
  
    run: function(rooms){
        if (!Memory.rooms){
            Memory.rooms = rooms;
        }
        for (var roomName in rooms){
            var room = Game.rooms[roomName];
            if (!room.memory.creeps){
                room.memory.creeps = room.find(FIND_MY_CREEPS);
            }
            tFighter.run(room);
            this.initRoom(room);
        }
    },
    
    
    initRoom: function(room){
        if (room){
            if(!room.memory.creepcounts){
                var sources = this.updateSources(room);
                var total = 0;
                for (var i in sources){
                    var source = sources[i];
                    total += source.memory.maxWorkers;
                }
                room.memory.creepCounts = this.initRoomCreeps();
            }
            this.updateSources(room);
        }
    },
    
    initRoomCreeps: function(){
        return new creepCounts.CreepCounts(8, 2, 2);
    },
    
    updateSources: function(room){
        if (!room.memory.sources){
            room.memory.sources = {};
            var sources = room.find(FIND_SOURCES);
            for (var i in sources){
                var source = sources[i];
                source.memory = room.memory.sources[source.id] = {};
                source.memory.workers = 0;
                source.memory.maxWorkers = 4;
            }
        }
        else{
            var sources = room.find(FIND_SOURCES);
            for (var i in sources){
                var source = sources[i];
                source.memory = room.memory.sources[source.id];
            }
        }
    },
    
    getSources: function(room){
        var sources = room.find(FIND_SOURCES);
        for (var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id];
        }
        return sources;
    },
}

module.exports = roomManager;