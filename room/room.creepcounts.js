var CreepCounts = {
    harvesters: 0,
    harvestersMax: 8,
    upgraders: 0,
    upgradersMax: 2,
    builders: 0,
    buildersMax: 2,
    setMax: function(role, count){
        switch(role){
            case "harvester":
                harvestersMax = count;
                break;
            case "upgrader":
                upgradersMax = count;
                break;
            case "builder":
                buildersMax = count;
                break;
        }
    },
};

module.exports = CreepCounts;