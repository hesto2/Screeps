module.exports = function(){
    //ASSIGN FLAGS TO SQUADS
	/* Flags:

		Cyan - Move to Waypoint
		purple - Waypoint

		Red- Clear room (creeps + buildings)
		Yellow - Attack Target
		Grey - Claim Controller

		White- Hold Point
		Blue - Rally/Guard Room

	*/



	for(var i=1;i<=Object.keys(Memory.squadGroups).length;i++){
		Memory.squadGroups[i].flags = {}
		Memory.squadGroups[i].flags.cyan = []
		Memory.squadGroups[i].flags.purple = []
		Memory.squadGroups[i].flags.red = []
		Memory.squadGroups[i].flags.yellow = []
		Memory.squadGroups[i].flags.grey = []
		Memory.squadGroups[i].flags.white = []
		Memory.squadGroups[i].flags.blue = []
		Memory.squadGroups[i].flags.green = []
	}

    for(var flag in Game.flags){
        flag = Game.flags[flag]
		var squad = flag.name.substr(0,flag.name.indexOf('-'))
        if(Memory.squadGroups[squad] != undefined){
            Memory.squadGroups[squad].flags[flag.color].push(flag)

        }



	}
}
