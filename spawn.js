module.exports = function()
{

    var builders;
    var transfers;
    var couriers;
    var janitors;
    var builders;
    var workers;
    var warriors;
    var medics;
	   var spawn1 = Game.spawns.Spawn1;
	//Bodies
    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter:{structureType:"extension",energy:50}})
   if(Memory.totalEnergy >= 500)
    {
        var workerBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    	var transferBody = [CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	var courierBody = [CARRY,WORK,WORK,WORK,MOVE];
    	var warriorBody = [TOUGH,ATTACK,ATTACK,MOVE,MOVE];
    }
    else
    {
    	var workerBody = [WORK,CARRY,MOVE];
    	var transferBody = [CARRY,MOVE,MOVE,MOVE];
    	var courierBody = [CARRY,WORK,WORK,MOVE];
    	var warriorBody = [ATTACK,ATTACK,MOVE,MOVE];
    }
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
	if(Memory.totalEnergy > 5500)
	{
	    workers = 15
	    couriers = 12;
	    warriors = 12;
	    builders = 5;
	}
	else if(Memory.totalEnergy > 4250)
	{
	    workers = 15;
	    warriors = 9;
	    couriers = 9;
	    builders = 5;
	}
	else if(Memory.totalEnergy > 3500)
	{
	    workers = 13;
	    warriors = 6;
	    couriers = 6;
	    builders = 5;
	}
	else if(Memory.totalEnergy > 1500)
	{
	    workers = 9;
	    warriors = 3;
	    couriers = 4;
	    builders =4;

	}
	else if(Memory.totalEnergy > 1000)
	{
	    workers = 7
	    warriors = 1;
	    couriers = 3;
	    builders = 3;
	}
	else if(Memory.totalEnergy > 450)
	{
	    harvesters = 10;
	    workers = 6
	    builders = 1;
	    couriers = 2;
	}
	else
	{
	    harvesters = 5;
	    workers =4;
	    couriers = 1;
	    builders = 1;
	}
    transfers = workers
    //warriors = 5
    // CREATE LOGIC
    if(Memory.warriors < warriors)
    {
    	var flags = spawn1.room.find(FIND_FLAGS, {filter:{color:COLOR_RED}})
    	var target;
    	for(var flag in flags)
    	{
    	    flag = flags[flag]
    		var creeps = flag.room.find(FIND_MY_CREEPS, {filter:{role:"warrior",post: flag}})
    		if(creeps.length < warriors/flags.length){target = flag; break;}

    	}

	    console.log("Creating warrior for " + target.name);
    	spawn1.createCreep(warriorBody,undefined,{role:"warrior",post:target,task:"waiting",target:"none"})

    }
	else if(Memory.workers < workers ){
	    var index = Memory.curSource;
	    console.log(Memory.curSource);
	    console.log("Spawning worker for " + Memory.curSource);
	    Memory.curSource += 1;
	    if(Memory.curSource >= Memory.safeSources.length){Memory.curSource = 0}
	    var target = Memory.safeSources[index];
	    spawn1.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming"});

	}

	else if(Memory.couriers < couriers){
	    console.log("Spawning courier");
	    spawn1.createCreep(courierBody,undefined, {role:"courier"});
	}

	else if(Memory.transfers < transfers){
	    console.log("Spawning Transfer");
	     var count = spawn1.room.find(FIND_MY_CREEPS, {filter:
                    function(object){
                        if(object.memory.role =="transfer" && object.memory.task == "extension")return object;}})
	     var eCount = spawn1.room.find(FIND_MY_STRUCTURES, {filter:
                function(object){
                    return object.structureType == "extension"

                }})
	     if(count.length <= eCount.length*.5){var task="extension"}
	     else{var task ="source"}
	    spawn1.createCreep(transferBody,undefined, {role:"transfer", target:"none", task:task});
	}

	else if(Memory.builders < builders && spawn1.room.find(FIND_CONSTRUCTION_SITES).length){
	    console.log("Spawning builder");
	    spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role:"builder"});
	}
}
