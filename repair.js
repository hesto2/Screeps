module.exports=function repair(creep){
    creep.pickupDropped()
    if(creep.fatigue > 0)return;
    var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)
	if(spawn == null){
	    spawn = Game.spawns.Spawn1
	}
    var room = Game.rooms[creep.memory.room.name]
    var repairers = room.memory.repairers

    if(spawn.hits < spawn.hitsMax){
        creep.memory.target = spawn;
    }
    //Reload on energy
    else if(creep.energy == 0){
        if(room.roomEnergy <= 300)return;
        creep.moveTo(spawn)
        spawn.transferEnergy(creep);
    }
    //Repair Target
    else
    {
        if(creep.memory.target == "none"){
            getTarget(creep,room)
        }
        var target = creep.memory.target;
        target = Game.getObjectById(target.id)
        if(target == null)creep.memory.target = 'none'
        if(creep.pos.isNearTo(target)){
            creep.repair(target)
        }
        else{
            creep.moveTo(target)
        }
        checkTarget(creep,target)
    }
}

//Determine what to fix first
function getTarget(creep,room){

    var ramparts =[]
    var roads = []
    var walls = []

    if(room.memory.threshold == undefined){
        room.memory.threshold = 1000000
    }

    var threshold = room.memory.threshold

    room.find(FIND_STRUCTURES,{filter:function(object){
        if(object.structureType == STRUCTURE_RAMPART && object.hits < .95 * threshold)
        {
            ramparts.push(object)
        }
        else if(object.structureType == STRUCTURE_ROAD && object.hits < .75*object.hitsMax){
            roads.push(object)
        }
        else if(object.structureType == STRUCTURE_WALL && object.hits < .95 * threshold ){

                var near = object.pos.findInRange(FIND_HOSTILE_STRUCTURES,3)
                if(near.length)near = true
                if(near == false)
                walls.push(object)
        }
    }})
    if(creep.memory.task == "roads" && roads.length > 0){
        creep.memory.target = roads[0];
    }
    else if(ramparts.length > 0){
        creep.memory.target = ramparts[0];
    }
    else if(roads.length > 0){
        creep.memory.target = roads[0];
    }
    else if(walls.length > 0 ){
        creep.memory.target = walls[0];
    }

    if(ramparts.length == 0 && walls.length == 0 && room.memory.structures.ramparts.length > 1 && room.memory.structures.walls.length > 1){
        room.memory.threshold += 1000000
    }


}

//Determine if target should keep being repaired or not
function checkTarget(creep,target){
    if(target == null)return
    if(target.hits == target.hitsMax || target.hits >= creep.room.memory.threshold){
        creep.memory.target = "none";
    }
}
