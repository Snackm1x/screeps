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
        this.updateRoomMemory(room);
        creepSpawner.determineSpawn(room);
        let myCreeps = room.find(FIND_MY_CREEPS);
        classManager.run(myCreeps);
        this.checkRoomLevel(room);
    },
    
    updateRoomMemory: function(room){
        this.getCreepCount(room);
        this.getConstructionSites(room);
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
        let screeps = room.memory.screeps;
        let workers = _.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.class == "worker");
        let harvesters = _.filter(workers, (creep) => creep.memory.role == "harvester");
        let upgraders = _.filter(workers, (creep) => creep.memory.role == "upgrader");
        let builders = _.filter(workers, (creep) => creep.memory.role == "builder");
        
        screeps.workers = workers.length;
        screeps.harvesters = harvesters.length - this.getCloseToDeath(harvesters) || 0;
        screeps.upgraders = upgraders.length - this.getCloseToDeath(upgraders) || 0;
        screeps.builders = builders.length - this.getCloseToDeath(builders) || 0;
        screeps.shouldSpawn = this.setShouldSpawn(room);
    },
    
    setShouldSpawn: function(room){
        let screeps = room.memory.screeps;
        if (screeps.harvesters < screeps.harvestersMax){
            return true;
        }
        if (screeps.upgraders < screeps.upgradersMax){
            return true;
        }
        if (screeps.builders < screeps.buildersMax){
            return true;
        }
        return false;
    },
    
    getStructures: function(room){
        
    },
    
    getConstructionSites: function(room){
        if (!room.memory.buildingSites){
            room.memory.buildingSites = {};
            let mySites = room.find(FIND_CONSTRUCTION_SITES);
            room.memory.buildingSites = mySites.length;
        }
    },
    
    getCloseToDeath: function(screeps){
        return _.filter(screeps, (creep) => creep.ticksToLive <= 200).length;
    },
};

module.exports = roomManager;