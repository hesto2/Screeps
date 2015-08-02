module.exports = function (creep) {
creep.pickupDropped()
if(creep.fatigue > 0)return;
  var target = creep.memory.home
  target = Game.getObjectById(target.id)

    var ctrl = creep.room.controller;
    var task = creep.memory.task;

    if(creep.energy == 0 || task == 'harvesting')
    {

        creep.memory.task = "coming";
        var flag = creep.findFlag(creep.room,"Couriers")
        if(task != 'harvesting'){
            var link = creep.memory.link
            if(creep.memory.link == undefined){
               link = Game.getObjectById(creep.room.memory.structures.links.controller)
               creep.memory.link = link
            }
            if(link != null && link != undefined && (link.energy > 0 || flag == undefined))
            {
                link = Game.getObjectById(creep.memory.link.id)
                creep.moveTo(link,{reusePath:20});
                link.transferEnergy(creep);
                return;
            }
        }
        if(flag == undefined)
        {
            creep.moveTo(target,{reusePath:20});
            if(creep.room.memory.roomEnergy < 500)
            {
                target.transferEnergy(creep,50);
            }
            else if(creep.room.memory.roomEnergy < 300)
            {
                return;
            }
            else
            {
                target.transferEnergy(creep);
            }
        }
        else{
            creep.harvestAtFlag(flag,creep)
        }
    }
    else
    {

        if(creep.pos.isNearTo(ctrl)){
            creep.memory.task = "working";
            creep.upgradeController(ctrl);
        }
        else{
            creep.memory.task = "going";
            creep.moveTo(ctrl,{reusePath:20,heuristicWeight:1});
        }

    }

}
