var Worker = require('class.worker');
var Fighter = require('class.fighter');

var classManager = {
    run: function(creeps){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            switch(creep.memory.class){
                case "worker":
                    Worker.run(creep);
                    break;
                case "fighter":
                    Fighter.run(creep);
                    break;
            }
        }
    },
    
    setRole: function(creep, newRole){
        if (newRole != '' && newRole != undefined){
            creep.memory.role = newRole;
        }
    },
    
    setClass: function(creep, newClass){
        if (newClass != '' && newClass != undefined){
            creep.memory.class = newClass;
        }
    }
};

module.exports = classManager;