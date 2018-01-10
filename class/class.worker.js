var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');
var roleRepairer = require('role.repairer');

var Worker = {
    run: function(creep){
        this.executeRole(creep);
    },
    
    executeRole: function(creep){
        switch(creep.memory.role){
            case "harvester":
                roleHarvester.run(creep);
                break;
            case "upgrader":
                roleUpgrader.run(creep);
                break;
            case "builder":
                roleBuilder.run(creep);
                break;
        }
    },
};

module.exports = Worker;