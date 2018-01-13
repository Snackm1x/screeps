var sharedFunctions = require('role.sharedFunctions');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = this.findConstructionSites(creep.room);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var targets = sharedFunctions.findEnergyFromAnywhere(creep);
            var target = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    
    findConstructionSites: function(room){
        //Add priority building into this (things before roads etc)
        return room.find(FIND_CONSTRUCTION_SITES);
    },
};

module.exports = roleBuilder;