module.exports = function (creep) {
    creep.pickupDropped()
    if(creep.fatigue > 0)return;
    if(creep.energy == 0 || creep.memory.task == "harvest")
    {

        creep.memory.task = "harvest"
        if(creep.room != Game.flags.nomad.room){
            creep.moveTo(Game.flags.nomad)
            return
        }
        else
        {
           /* if(creep.memory.target == undefined)
            {
                creep.memory.target = Game.flags.nomad.pos.findClosest(FIND_SOURCES)
                if(target == null){
                    flag = Game.flags.nomadSource
                   target =  flag.room.lookForAt('source',flag.pos)
                }
            }

            var target = creep.memory.target
            target = Game.getObjectById(target.id)
            creep.moveTo(target)
            creep.harvest(target)*/
            creep.harvestAtFlag(Game.flags.nomad,creep)
        }
        if(creep.energy == creep.energyCapacity){
            creep.memory.task = "work"
        }
    }
    else
    {
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES)
        if(sites.length > 0){
            creep.moveTo(sites[0]);
            creep.build(sites[0]);
        }
        else{
            var ctrl = Game.flags.nomad.room.controller;

            creep.moveTo(ctrl);
            if(Game.flags.nomad.color == COLOR_RED){
                creep.unclaimController(ctrl)
            }
            else if(ctrl.my == false)
            {
                creep.claimController(ctrl)
            }
            else{
                creep.upgradeController(ctrl);
            }

        }

    }

}
