module.exports = function(creep){
    creep.pickupDropped()

    if(creep.fatigue > 0)return;
    var spawn = creep.memory.home
    var target = creep.memory.target
	spawn = Game.getObjectById(spawn.id)

    if(creep.energy == 0 || creep.memory.task == 'harvesting')
    {
        creep.memory.task = "coming"
        var flag = creep.findFlag(creep.room,"Builders")
        if(flag == undefined){
            if(creep.pos.isNearTo(spawn)){
                spawn.transferEnergy(creep)
            }
            else{
                creep.moveTo(spawn)
            }
        }
        else{
            creep.harvestAtFlag(flag,creep)
        }
    }
	else{
	    target = Game.getObjectById(target.id)
	    if(target == 'none' || target == undefined || target == null ){

		   var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		   if(targets.length > 0) {
    		   target = targets[0]
    		   creep.memory.target = target
    		   creep.memory.targetType = target.structureType
    		   creep.memory.targetPos = target.pos
		   }
    	    else{
                creep.memory.role = "repair";
                creep.memory.task = 'none';
            }
	    }

		if(creep.pos.isNearTo(target)) {
		    if(creep.memory.task == 'repairing'){
	            creep.repair(target)
	            if(target.hits > 5000){
	                creep.memory.task = 'building'
	                creep.memory.target = 'none'
	            }
    	    }
    	    else{
    	        creep.build(target)
    	    }
		}
        else{
           creep.moveTo(target)
        }

        if(target == null){

                var type = creep.memory.targetType

                if(type != STRUCTURE_WALL && type != STRUCTURE_RAMPART){console.log(type);return}
                target = creep.memory.targetPos
                target = creep.room.lookForAt('structure',target.x,target.y)

                if(target.length){
                    for(var object in target){
                        object = target[object]
                        if(object.structureType == type){
                            object = Game.getObjectById(object.id)
                            target = object
                            break
                        }
                    }
                }

                target = Game.getObjectById(target.id)
                if(target == null)creep.memory.target = 'none'
                else{
                    creep.memory.target = target
                    creep.memory.task = 'repairing'
                    return

                }

            }


	}

 }

 function getSafeSources(room)
{
   var sources = room.find(FIND_SOURCES);
   var lairs = room.find(FIND_HOSTILE_STRUCTURES);
   var count = 0;
   for(var lair in lairs)
   {
       lair = lairs[count];
       var right = lair.pos.x + 6;
       var bottom = lair.pos.y + 6;
       var left = lair.pos.x - 6;
       var top = lair.pos.y - 6;

       var indices = lair.room.lookForAtArea('source',top,left,bottom,right);

       var hit;
       for(var x in indices)
       {
           for(var y in indices[x])
           {

               var target = indices[x][y];
               var index = sources.indexOf(target);
               if (index > -1) {
                   sources.splice(index, 1);
               }
           }
       }
      count++;
   }
   return sources;
}
