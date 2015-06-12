module.exports = function(creep){
    var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)
		if(creep.energy == 0 && Memory.workers > 1 && Memory.transfers > 1 && Game.flags.bMove == undefined) {
			creep.moveTo(spawn);
			spawn.transferEnergy(creep);
		}
		else if((creep.energy == 0 || creep.memory.task == "harvest") && Game.flags.bMove != undefined){
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
		if(targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
      }

    }
	else{
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
      else{
        if(creep.memory.target == "none" || creep.memory.target == undefined){

          targets = creep.room.find(FIND_MY_STRUCTURES, {filter: function(object){
            if(object.hits < object.hitsMax *.5)return object;
          }})
          creep.memory.target == targets[0]
        }
        else {
          {

            var target = creep.memory.target
            creep.moveTo(target)
            creep.repair(target)
            if(target.hits == target.hitsMax){creep.memory.target == "none"}
          }
        }
      }

		}
 }
