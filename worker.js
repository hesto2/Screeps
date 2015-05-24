module.exports = function (creep) {
        var sources = creep.memory.target
            sources = Game.getObjectById(sources["id"])
        
        if(creep.energy < creep.energyCapacity) {
            creep.memory.task = "coming";
            creep.moveTo(sources);
            creep.memory.task = "working";
            creep.harvest(sources);
        }
        else {
            
            if(creep.memory.task == "meeting")
            {
                var target = creep.room.find(FIND_MY_CREEPS, filter:{role:"transfer", target:creep})
                creep.moveTo(target);
                creep.transferEnergy(target);
            }
            else
            {
                creep.memory.task = "going";
                creep.moveTo(Game.spawns.Spawn1);         
                creep.transferEnergy(Game.spawns.Spawn1)
            }

            

        }
    
    
}