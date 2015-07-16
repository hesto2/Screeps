module.exports = function(creep){
    if(creep.fatigue > 0)return;
    var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)

	//creep.moveTo(spawn);
	//return
	if(creep.energy == 0 && creep.room.memory.roomEnergy > 200 && Game.flags.bMove == undefined /*&& !(creep.pos.inRangeTo(creep.pos.findClosest(FIND_SOURCES),10))*/) {
			if(spawn.room.memory.roomEnergy < 300){
			    return;
			}
			creep.moveTo(spawn);

			spawn.transferEnergy(creep);
		}
		else if((creep.energy == 0 || creep.memory.task == "harvest") && Game.flags.bMove != undefined ){
		        //var target = creep.pos.findClosest(getSafeSources(Game.flags.bMove.room));
		        var target = creep.pos.findClosest(FIND_SOURCES);
		        creep.moveTo(target)
		        creep.harvest(target);
		        if(creep.energy == creep.energyCapacity){
		            creep.memory.task = "build"

		        }
		        else{
		            creep.memory.task = "harvest"
		        }

		}
    else if(Game.flags.bMove != undefined)
    {

        if(creep.room != Game.flags.bMove.room){
            creep.moveTo(Game.flags.bMove);

        }
      else{
          var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length > 0) {
		   creep.build(targets[0]);
			creep.moveTo(targets[0]);

		}
		//creep.moveTo(Game.flags.bMove)
      }


    }
	else{
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length > 0) {
		    creep.moveTo(targets[0])
		    creep.build(targets[0])

		    }
        else{
            creep.memory.role = "repair";
            creep.memory.task = 'none';

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
