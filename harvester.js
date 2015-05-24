module.exports = function (creep) {
        var sources = creep.memory.target
        if(sources == undefined || sources == 1)
        {
              sources = creep.pos.findClosest(FIND_SOURCES)
        }
        else
        {
            sources = Game.getObjectById(sources["id"])
        }
        //var sources = Game.getObjectById(creep.memory.target["id"]);
//todo    var emptySpawn = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter: function(object) {return (object.structureType == STRUCTURE_EXTENSION) }});
        if(creep.energy < creep.energyCapacity) {
            creep.moveTo(sources);
            creep.harvest(sources);
        }
        else {
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)

        }
    
    
}