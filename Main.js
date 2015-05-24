var harvester = require("harvester");
var courier = require("courier");
var totCouriers=0;
var totHarvesters=0;
var totJanitors=0;
var harvesters;
var couriers;
var janitors;
var spawn1 = Game.spawns.Spawn1;

var lairs = Game.spawns.Spawn1.room.find(FIND_HOSTILE_STRUCTURES)

//ADD SEPARATE MODULE JUST FOR SPAWN LOGIC AND ROLE ASSIGNMENT

for(var name in Game.creeps) {
    
    var creep = Game.creeps[name];
    
    if(creep.memory.role == "harvester")
    {
        harvester(creep);
        totHarvesters++;
    }
    else if(creep.memory.role == "courier")
    {
        courier(creep);
        totCouriers++;
    }
    else if(creep.memory.role == "janitor")
    {
        janitor(creep);
        totJanitors++;
    }
}

//First tier

if(spawn1.energy > 3500)
{
    harvesters = 16;
    couriers = 8;
    janitors = 1
}
else if(spawn1.energy > 1000)
{
    harvesters = 14;
    couriers = 4;
    janitors = 1;
}
else
{
    harvesters = 10;
    couriers = 2;
    janitors = 0
}

if(totHarvesters < harvesters ){
    var sources = Memory.safeSources;
    var target = sources[0]; 
    for(var source in sources)
    {
        source = sources[source];
        if(source.energy >= target.energy)
        {
            target = source;
        }
        
    }
    spawn1.createCreep([WORK,CARRY,MOVE,MOVE],undefined, {role:"harvester",target:target});

}
else if(totCouriers < couriers){
    spawn1.createCreep([WORK,CARRY,MOVE,MOVE],undefined, {role:"courier"});
}






