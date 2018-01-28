var roomFunctions = require('room.sharedFunctions');

var roomBuilding = {
    
    level2Building: function(room){
        var mySpawns = roomFunctions.getRoomSpawns(room);
        var startSpawn = mySpawns[0];
        var canPlace = this.checkAreaWest(5, 3, startSpawn.pos, room);
        if (canPlace){
            this.placeLevel2Extensions(room, startSpawn);
            this.placeMiningContainers(room);
        }
    },
    
    placeLevel2Extensions: function(room, startSpawn){
        let startPos = startSpawn.pos.x;
        startPos -= 5;
        let newY = startSpawn.pos.y;
        newY -= 1;
        for (var i = startPos; i < startSpawn.pos.x; i ++){
            room.createConstructionSite(i, startSpawn.pos.y, STRUCTURE_ROAD);
            if (room.createConstructionSite(i, newY, STRUCTURE_EXTENSION) == OK){
                room.createConstructionSite(i, newY, STRUCTURE_EXTENSION);
            }
        }
    },
    
    placeMiningContainers: function(room){
        var containers = room.memory.miningContainers;
        room.memory.miningContainers = {};
        for (var i = 0; i < containers.length; i++){
            var miningContainer = containers[i];
            room.createConstructionSite(miningContainer.x, miningContainer.y, STRUCTURE_CONTAINER);
            miningContainer.memory = room.memory.miningContainers[miningContainer.id] = {};
        }
    },
    
    placeExtraContainers: function(room){
        // just find somewhere useful to dump extra containers I guess if we need them  
    },
    
    placeRoadsTo: function(room, startPosition, endPosition){
        var myPath = room.findPath(startPosition, endPosition);
        for (var i = 1; i < myPath.length - 1; i++){
            var posObj = myPath[i];
            room.createConstructionSite(posObj.x, posObj.y, STRUCTURE_ROAD);
        }
    },
    
    checkAreaWest: function(w, h, startPosition, room){
        var x = startPosition.x - w;
        var y = startPosition.y - Math.floor(h / 2);
        var bottomX = x + w;
        var bottomY = y + h;
        for (var i = x; i < bottomX; i++){
            for (var k = y; k < bottomY; k++){
                var terrain = Game.map.getTerrainAt(i, k, room);
                if (terrain == "wall"){
                    return false;
                }
            }
        }
        return true;
    },
    
    checkWest: function(startPosition, room){
        var x = startPosition.x - i;
        var y = startPosition.y;
        var terrain = Game.map.getTerrainAt(x,y, room);
        if (terrain != "wall"){
            return true;
        } else {
            return false;
        }
    },
    
    checkNorth: function(startPosition, room){
        var x = startPosition.x;
        var y = startPosition.y + 1;
        var terrain = Game.map.getTerrainAt(x,y, room);
        if (terrain != "wall"){
            return true;
        } else {
            return false;
        }
    },
    
    checkEast: function(startPosition, room){
        var x = startPosition.x + 1;
        var y = startPosition.y;
        var terrain = Game.map.getTerrainAt(x,y, room);
        if (terrain != "wall"){
            return true;
        } else {
            return false;
        }
    },
    
    checkSouth: function(startPosition, room){
        var x = startPosition.x;
        var y = startPosition.y - 1;
        var terrain = Game.map.getTerrainAt(x,y, room);
        if (terrain != "wall"){
            return true;
        } else {
            return false;
        }
    }
};

module.exports = roomBuilding;