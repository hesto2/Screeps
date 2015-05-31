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
	if(spawn1.spawning != null)return;
	//Bodies
    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter:{structureType:"extension",energy:50}})
   if(Memory.totalEnergy >= 700)
    {
        var workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    	var transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	var courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE];
    	var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
    	var builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    }
    else if(Memory.totalEnergy >= 600)
    {
        var workerBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    	var transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	var courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
    	var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
    	var builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    }
    else if(Memory.totalEnergy >= 500)
    {
        var workerBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    	var transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	var courierBody = [WORK,WORK,WORK,WORK,CARRY,MOVE];
    	var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
    	var builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    }
    else
    {
    	var workerBody = [WORK,CARRY,MOVE];
    	var transferBody = [CARRY,MOVE,MOVE,MOVE];
    	var courierBody = [CARRY,WORK,WORK,MOVE];
    	var warriorBody = [ATTACK,ATTACK,MOVE,MOVE];
    	var builderBody = [WORK,CARRY,MOVE,MOVE];
    }

	//First tier

    if(Memory.totalEnergy > 700)
	{
	    workers = 7
	    warriors = 5;
	    couriers = 3;
	    builders = 2;
	    transfers = workers+4;
	    if(Memory.workers > 6 && Memory.transfers > 9 && Memory.couriers > 2)
	    {
	        warriors = 10;
	    }
	}
	else if(Memory.totalEnergy > 525)
	{
	    workers = 7
	    warriors = 2;
	    couriers = 3;
	    builders = 1;
	    transfers = workers+2;
	}
	else if(Memory.totalEnergy > 450)
	{
	    workers = 6
	    builders = 1;
	    couriers = 2;
	    transfers = workers
	}
	else
	{
	    workers =4;
	    couriers = 1;
	    builders = 1;
	    transfers = workers
	}
    //warriors = 5

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
	    console.log("Spawning worker for " + Memory.curSource);
	    Memory.curSource += 1;
	    if(Memory.curSource >= Memory.safeSources.length){Memory.curSource = 0}
	    var target = Memory.safeSources[index];
	    spawn1.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming",home:Game.spawns.Spawn1});

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

	else if(Memory.builders < builders && (spawn1.room.find(FIND_CONSTRUCTION_SITES).length||Game.flags.bMove.room.find(FIND_CONSTRUCTION_SITES).length)){
	    console.log("Spawning builder");
	    spawn1.createCreep(builderBody,undefined, {role:"builder"});
	}
}
