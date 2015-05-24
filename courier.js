var harvester = require("harvester");
module.exports = function (creep) {

    var spawn = Game.spawns.Spawn1;
    var ctrl = creep.room.controller;
    if(spawn.energy < 300)
        {
            harvester(creep);
        }
    else{
        if(creep.energy == 0 )
        {
           
            
                creep.moveTo(spawn);
                spawn.transferEnergy(creep);
     
        }
        else
        {
            creep.moveTo(ctrl);
            creep.upgradeController(ctrl);
    
        
        }
    }
    
}