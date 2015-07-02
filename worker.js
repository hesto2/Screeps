module.exports = function (creep) {
    if(creep.fatigue > 0)return;
	var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)

        var sources = creep.memory.target
        if(sources == undefined || sources == 1)
        {
              sources = creep.pos.findClosest(FIND_SOURCES)
        }
        else{
        var sources = creep.memory.target
            sources = Game.getObjectById(sources["id"])
        }

        if(creep.energy < creep.energyCapacity && creep.memory.task != 'going') {
            if(creep.pos.isNearTo(sources)){
                creep.harvest(sources);
                creep.memory.task = "working";
            }
            else{
                creep.moveTo(sources);
                creep.memory.task = 'going to source'
            }


        }
        else {

            if(creep.memory.task == "meeting")
            {
                var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                    function(object){
                        if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}})

                if(target  == undefined)
                {
                    creep.memory.task ="going";
                }
                else
                {
                    if(creep.pos.isNearTo(target)){
                        creep.transferEnergy(target);
                    }
                    else
                    {
                        creep.moveTo(target);
                    }

                }
            }
            else
            {
                var targets = creep.room.memory.transfers
                var target = creep.pos.findClosest(targets, {filter:
                    function(object){
                        if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}})
                if(target != undefined && target != null)
                {
                    creep.memory.task = "meeting"
                }
                creep.memory.task = "going";
  			        creep.moveTo(spawn);
  	            creep.transferEnergy(spawn)
  	            var transfer = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                    function(object){
                        if(object.memory.role =="transfer")return object;}})
                    if(creep.pos.isNearTo(transfer))
                    {
                        creep.transferEnergy(transfer);
                    }
            }



        }
}
