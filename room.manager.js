var creepSpawner = require('creep.spawner');
var classManager = require('class.manager');
var roomBuilding = require('room.building');
var roomInit = require('room.init');

var roomManager = {
  
    run: function(rooms){
        if (!Memory.rooms){
            Memory.rooms = rooms;
        }
        for (var roomName in rooms){
            var room = Game.rooms[roomName];
            roomInit.init(room);
            this.manageRoom(room);
        }
    },
    
    manageRoom: function(room){
        this.getCreepCount(room);
        creepSpawner.determineSpawn(room);
        let myCreeps = room.find(FIND_MY_CREEPS);
        classManager.run(myCreeps);
        this.checkRoomLevel(room);
    },
    
    checkRoomLevel: function(room){
        if(!room.memory.currentLevel){
            room.memory.currentLevel = room.controller.level;
        }
        
        this.roomLevelUp(room);
    },
    
    roomLevelUp: function(room){
        if( room.memory.currentLevel < room.controller.level){
            room.memory.currentLevel = room.controller.level;
            this.prepareEarlyGameSwitch(room);
        }
    },
    
    prepareEarlyGameSwitch: function(room){
        if(room.memory.currentLevel == 2){
            roomBuilding.level2Building(room);
        } 
    },
    
    getCreepCount: function(room){
        let workers = _.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.class == "worker");
        let harvesters = _.filter(workers, (creep) => creep.memory.role == "harvester");
        let upgraders = _.filter(workers, (creep) => creep.memory.role == "upgrader");
        let builders = _.filter(workers, (creep) => creep.memory.role == "builder");
        
        room.memory.workers = workers.length - this.getCloseToDeath(workers) || 0;
        room.memory.harvesters = harvesters.length - this.getCloseToDeath(harvesters) || 0;
        room.memory.upgraders = upgraders.length - this.getCloseToDeath(upgraders) || 0;
        room.memory.builders = builders.length - this.getCloseToDeath(builders) || 0;
    },
    
    getCloseToDeath: function(screeps){
        return _.filter(screeps, (creep) => creep.ticksToLive <= 400);
    },
}

module.exports = roomManager;