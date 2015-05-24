var harvester = require("harvester");
module.exports = function (creep) {
    if(creep.memory.task == "spawn")
    {
        creep.memory.task = "controller";
    }
    
    var spawn = Game.spawns.Spawn1;
    var ctrl = creep.room.controller;
    var task = creep.memory.task;  
    
   // if(creep.memory.task == "controller")
    {
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
    }/*
    else if(creep.memory.task == "extension")
    {
        if(creep.energy == 0 )
        {
            creep.moveTo(spawn);
            spawn.transferEnergy(creep);
        }
        else
        {
            var extension = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter:
                function(object){
                    return object.structureType == "extension" && object.energy < object.energyCapacity
                    
                }})
            creep.moveTo(extension);
            creep.transferEnergy(extension);
        }
    }
    */
}