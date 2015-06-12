module.exports = function(creep){

	var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){
	    if(object.memory.role == "keeperKiller")return object;
	}})
	//console.log(target)
	if(target != undefined){
	        creep.moveTo(target)a
	        creep.heal(target)
	    }

}
