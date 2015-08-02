module.exports = function(creep){
    creep.pickupDropped()
    if(creep.fatigue > 0)return;
   //if(creep.room == Game.flags.test.room) creep.moveTo(Game.flags.test);return;
	var target = creep.memory.target;
	target = Game.getObjectById(target.id);

	if(creep.energy == creep.energyCapacity){
		creep.moveTo(target,{reusePath:20});
		creep.transferEnergy(target);
	}
	else{
	    var source
	    if(creep.memory.source == undefined){
	            source = target.pos.findClosest(FIND_SOURCES);
	        	creep.memory.source = source
		    }

		    source = creep.memory.source
		    if(source == null)return
		    source = Game.getObjectById(source.id)
			if(creep.pos.isNearTo(source)){
			    creep.harvest(source);
			    if(creep.pos.isNearTo(target)){
			        creep.transferEnergy(target)
			    }
			}
			else{
			    creep.moveTo(source);
			}




	}
}
