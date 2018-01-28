var Worker = require('class.worker');

var classManager = {
    run: function(creeps){
        for(var i in creeps) {
            let creep = creeps[i];
            switch(creep.memory.class){
                case "worker":
                    Worker.run(creep);
                    break;
            }
        }
    },
};

module.exports = classManager;