module.exports=function repair(creep){
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
        creep.moveTo(target)
        creep.repair(target)
        checkTarget(creep,target)
    }
}

//Determine what to fix first
function getTarget(creep,room){

    var ramparts =[]
    var roads = []
    var walls = []
    room.find(FIND_STRUCTURES,{filter:function(object){
        if(object.hits < object.hitsMax * .75 ){
            if(object.structureType == STRUCTURE_RAMPART)
            {
                if(room.name == 'E2S1' && object.pos.x == 17 && object.pos.y == 18)return;
                else
                ramparts.push(object)
            }
            else if(object.structureType == STRUCTURE_ROAD){
                roads.push(object)
            }
            else if(object.structureType == STRUCTURE_WALL ){

                var near = object.pos.findInRange(FIND_HOSTILE_STRUCTURES,3)
                if( ((room.name =='E3N2') && object.hits < 10000000) ||
                    ((room.name ==''|| room.name == 'E2S3') && object.hits < 6000000) ||
                    ((room.name == 'E2S1' || room.name =='E2S2' ) && object.hits < 4000000) ||
                    ((room.name == 'E4N2') && object.hits < 3000000) ||
                   ((room.name == '' || room.name == 'E3S1'|| room.name == 'E2S4' || room.name == 'E5S7') && object.hits < 2000000) ||object.hits<1000000){
                    if(near == false)
                    walls.push(object)
                }
            }
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




}

//Determine if target should keep being repaired or not
function checkTarget(creep,target){
    if(target == null)return
    if(target.hits == target.hitsMax || target.hits >= 4000000){
        creep.memory.target = "none";
    }
}
