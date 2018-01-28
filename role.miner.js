var roleMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        this.init(creep);
        
        if (creep.memory.mining){
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
    },
    
    init: function(creep){
        if(!creep.memory.mining){
            creep.memory.mining = false;
        } 
    },
    
};

module.exports = roleMiner;