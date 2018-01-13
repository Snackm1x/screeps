var creepManager = require('creep.manager');
var creepSpawner = require('creep.spawner');
var roomManager = require('room.manager');
var classManager = require('class.manager');


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    creepSpawner.run(Game.spawns);
    
    classManager.run(Game.creeps);
    
    roomManager.run(Game.rooms);
    
    
}