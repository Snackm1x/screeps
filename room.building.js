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
        let containers = room.memory.miningContainers;
        for (var i = 0; i < containers.length; i++){
            var miningContainer = containers[i];
            if(!miningContainer.IsBuilding){
                miningContainer.IsBuilding = true;
            }
            room.createConstructionSite(miningContainer.position.x, miningContainer.position.y, STRUCTURE_CONTAINER);
            
            //this places roads break this out?
            let mySpawns = roomFunctions.getRoomSpawns(room);
            let startSpawn = mySpawns[0];
            this.placeRoadsTo(room, startSpawn.pos, miningContainer.position);
        }
    },
    
    placeExtraContainers: function(room){
        // just find somewhere useful to dump extra containers I guess if we need them  
    },
    
    placeRoadsTo: function(room, startPosition, endPosition){
        const end = new RoomPosition(endPosition.x, endPosition.y, room.name);
        let myPath = room.findPath(startPosition, end);
        for (var i = 0; i < myPath.length - 1; i++){
            var posObj = myPath[i];
            if (room.createConstructionSite(posObj.x, posObj.y, STRUCTURE_ROAD) == OK){
                room.createConstructionSite(posObj.x, posObj.y, STRUCTURE_ROAD)
            }
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
};

module.exports = roomBuilding;