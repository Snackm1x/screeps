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
            var targets = sharedFunctions.gatherEnergy(creep);
            var target = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    
    findConstructionSites: function(room){
        var extensions = this.getExtensionsToBeBuilt(room);
        if(extensions){
            return extensions;
        }
        
        var containers = this.getContainersToBeBuilt(room);
        if(containers) {
            return containers;
        }
        
        var roads = this.getRoadsToBeBuilt(room);
        if(roads) {
            return roads;
        }
        
        var towers = this.getTowersToBeBuilt(room);
        if(towers){
            return towers;
        }
    },
    
    getExtensionsToBeBuilt: function(room) {
        let extensions = _.filter(room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType == STRUCTURE_EXTENSION);
        return extensions;
    },
    
    getContainersToBeBuilt: function(room) {
        let containers = _.filter(room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType == STRUCTURE_CONTAINER);
        return containers;
    },
    
    getRoadsToBeBuilt: function(room) {
        let roads = _.filter(room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType == STRUCTURE_ROAD);
        return roads;
    },
    
    getTowersToBeBuilt: function(room) {
        let towers = _.filter(room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType == STRUCTURE_TOWER);
        return towers;
    },
};

module.exports = roleBuilder;