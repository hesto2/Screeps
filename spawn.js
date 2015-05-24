module.exports = function()
{	
	var spawn1 = Game.spawns.Spawn1;
	//Bodies
	var workerBody = [WORK,WORK,CARRY,MOVE];
	var transferBody = [CARRY,CARRY,MOVE,MOVE];
/*
	var target;
	for(var source in Memory.safeSources)
	{
		source = Memory.safeSources[source];
		var creeps = spawn1.room.find(FIND_MY_CREEPS,{filter:{target:source}})
		if(creeps.length < 3)
		{
			target = source;
			spawn1.createCreep(workerBody,undefined,{role:"worker",target:target});
			break;
		}
	}

	var creeps = spawn1.room.find(FIND_MY_CREEPS,{filter:{role:"trasfer",target:source}})

*/


	//First tier
	
	if(spawn1.energy > 3500)
	{
	    harvesters = 25;
	    workers = Memory.safeSources.length * 4
	    couriers = 8;
	    builders = 8;
	    janitors = 1
	}
	else if(spawn1.energy > 1000)
	{
	    harvesters = 15;
	    workers = Memory.safeSources.length * 3
	    couriers = 4;
	    builders = 5;
	    janitors = 1;
	}
	else if(spawn1.energy > 750)
	{
	    harvesters = 10;
	    workers = Memory.safeSources.length * 2
	    couriers = 2;
	    builders = 2;
	}
	else
	{
	    harvesters = 5;
	    workers = Memory.safeSources.length * 1
	    couriers = 2;
	    builders = 1;
	    janitors = 0
	}

	if(Memory.totals.workers< workers ){
	    var index = Memory.curSource;
	    Memory.curSource++;
	    if(Memory.curSource >= Memory.safeSources.length){Memory.curSource = 0}
	    var target = Memory.safeSources[index];
	    
	    spawn1.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming"});

	}
	else if(Memory.totals.couriers < couriers){
	    spawn1.createCreep([WORK,CARRY,MOVE,MOVE],undefined, {role:"courier"});
	}
	else if(Memory.totals.trasnfer < couriers){
	    spawn1.createCreep(transferBody,undefined, {role:"transfer"});
	}
	else if(Memory.totals.builders < builders && spawn1.room.find(FIND_CONSTRUCTION_SITES).length){
	    spawn1.createCreep([WORK,CARRY,MOVE,MOVE],undefined, {role:"builder"});
	}
}