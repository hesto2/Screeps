var harvester = require("harvester");
var courier = require("courier");
var builder = require("builder");
var spawn = require("spawn");
var totCouriers=0;
var totHarvesters=0;
var totBuilders = 0;
var totJanitors=0;
var totTransfer = 0
var spawn1 = Game.spawns.Spawn1;

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
    else if(creep.memory.role == 'builder') {
        builder(creep);
        totBuilders++;
    }
    else if(creep.memory.role == 'worker') {
        worker(creep);
        totWorkers++;
    }
    else if(creep.memory.role == 'transfer') {
        transfer(creep);
        totTransfer++;
    }
}

//MemoryAssignment
Memory.totals.couriers = totCouriers;
Memory.totals.harvesters = totHarvesters;
Memory.totals.builders = totBuilders;
Memory.totals.workers = totWorkers;
Memory.totals.workers = totTransfer;
spawn();







