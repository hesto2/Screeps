module.exports = function(creep)
{
	var spawn = Game.spawns.spawn1;
	if(creep.energy == 0)
	{
		if(creep.memory.target == "none")
		{
			var target = creep.pos.findClosest(FIND_MY_CREEPS, filter:{role:"harvester", task:"going"})
			creep.memory.target = target;
			target.memory.task = "meeting";
		}
		
		creep.moveTo(target);
	}
	else
	{
		creep.memory.target = "none";
		creep.moveTo(Game.spawns.Spawn1);    
        creep.transferEnergy(Game.spawns.Spawn1)
	}
}