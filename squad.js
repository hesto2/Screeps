var medic = require("squadMedic")
var melee = require("squadMelee")
var ranged = require("squadRanged")
module.exports = function(creep){

	//ASSIGN FLAG TO CREEP
	/* Flags:

		Cyan - Move to Waypoint
		purple - Waypoint

		Red- Clear room (creeps + buildings)
		Yellow - Attack Target
		Grey - Claim Controller

		White- Hold Point
		Blue - Rally/Guard Room

	*/



	var flags = Memory.squadGroups[creep.memory.squad].flags
    var flag
	if(flags.cyan.length > 0){
		flag = flags.cyan[flags.cyan.length-1]
	}
	else if(flags.green.length > 0){
		flag = flags.red[flags.red.length-1]
	}
	else if(flags.red.length > 0){
		flag = flags.red[flags.red.length-1]
	}
	else if(flags.yellow.length > 0){
		flag = flags.yellow[flags.yellow.length-1]
	}
	else if(flags.grey.length > 0){
		flag = flags.grey[flags.grey.length-1]
	}
	else if(flags.white.length > 0){
		flag = flags.white[flags.white.length-1]
	}
	else if(flags.blue.length > 0){
		flag = flags.blue[flags.blue.length-1]
	}




	//Role performance
	var task = creep.memory.task;
	if(creep.memory.task == "melee"){

		melee(creep,flag)
	}
	else if(creep.memory.task == "ranged"){
	    //console.log(flag.pos + " XXXXXXXXXXXXXX")
		ranged(creep,flag)
	}
	else if(creep.memory.task == "medic"){
		medic(creep,flag)
	}

	 //Move Creep to next waypoint
	if(flags.purple.length > 0){
		//creep.memory.nextWaypoint = getNextWaypoint(flags.purple,creep)
	}



}
function getNextWaypoint(flags,creep){
	var number
	var number = creep.memory.nextWaypoint
	var flag = Game.flags[creep.memory.squad+'-'+number]
	if(number == undefined){
		number = 1
	}
	else if(number < 0){
		return
	}
	else{
		if(creep.pos.isNearTo(flag))
		{
			number = number+1
		}
	}


	if(flag != undefined){

		creep.moveTo(flag, {reusePath:20})
	}
	else{
		number = -1
	}
	return number
}
