//Add squad status tracker for room. Make them all return if they are near their flag and the status is PEACE
//Add source keeper array and have creeps auto avoid it in moveTo function
//Add new spawn code that allows spawns to give units to different rooms and work together
//Sort all creeps into arrays and then perform roles, that way you can access the creeps array
//Add room controller at beginning that counts hostile creeps in the room and adds them to memory.
//Have worker creeps add themselves to a room variable array that says they are available, tell transfer creeps to move to that and set them as their target. Pop them off the array after claiming them
console.log("**********************************************************************")
var courier = require("courier");
var builder = require("builder");
var spawn = require("spawn");
var worker = require("worker")
var transfer = require("transfer");
//var construct = require("construct");
var squad = require("squad");
var keeperKiller = require("keeperKiller");
var kMedic = require("kMedic");
var linkWorker = require("linkWorker");
var repair = require("repair");
var nomad = require("nomad");
var prototypes = require('prototypes')
var rooms = require('rooms')
var cpuInit;
var cpuCreeps;
var cpuSpawn;

var cpuInit = Game.getUsedCpu();

 //Delete old creeps
for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}
//Init Prototypes
prototypes()
    var totCouriers=0;
    var totHarvesters=0;
    var totBuilders = 0;
    var totJanitors=0;
    var totTransfer = 0;
    var totWorkers =0;
    var totWarriors=0;

    Memory.totalEnergy = 0;
    Memory.energyCapacity = 0;
    //Init Rooms
    var squads = []
    rooms()

    var cpuCreeps = Game.getUsedCpu();
    for(var name in Game.creeps) {
         var startCpu = Game.getUsedCpu();

    // creep logic goes here
        var creep = Game.creeps[name];
        //if(creep.fatigue > 0)continue;
        if(creep.memory.room == undefined){
            creep.memory.room = creep.room

        }
        var room = Game.rooms[creep.memory.room.name]

        var dropped = creep.pos.findClosest(FIND_DROPPED_ENERGY)
        if(creep.pos.isNearTo(dropped))
    	{
    	    creep.pickup(dropped);
    	}


        if(creep.memory.role == "courier")
        {
            courier(creep);
            room.memory.couriers.push(creep);
            totCouriers++;
        }
        else if(creep.memory.role == "squad"){
            squads.push(creep);
            room.memory.squads.push(creep);
            squad(creep);
        }
        else if(creep.memory.role == 'builder') {
            builder(creep);
            room.memory.builders.push(creep);
            totBuilders++;
        }
        else if(creep.memory.role == 'worker') {
            worker(creep);
            room.memory.workers.push(creep);
            totWorkers++;
        }
        else if(creep.memory.role == 'transfer') {

            transfer(creep);
            room.memory.transfers.push(creep);
            totTransfer++;
        }
        else if(creep.memory.role == "keeperKiller"){
          keeperKiller(creep);
          room.memory.keeperKillers.push(creep);
        }
        else if(creep.memory.role == "kMedic"){
          kMedic(creep);
          room.memory.kMedics.push(creep);
        }
        else if(creep.memory.role == "linkWorker"){
          linkWorker(creep);
          room.memory.linkWorkers.push(creep);
        }
        else if(creep.memory.role == "repair"){
            repair(creep);
            room.memory.repairs.push(creep);
        }
        else if(creep.memory.role == "nomad"){
            nomad(creep)
            room.memory.nomads.push(creep)
        }
        if(creep.name == "test"){
            creep.moveTo(Game.flags.TEST)
        }
        //Print cpu usage per creep
         var elapsed = Game.getUsedCpu() - startCpu;
         if(elapsed > 10)
        console.log('Creep '+creep.memory.role+ ' ' +creep.memory.task +' has used '+elapsed+' CPU time ' + creep.room.name);
    }
    cpuCreeps = Game.getUsedCpu() - cpuCreeps;

    //MemoryAssignment
    Memory.couriers = totCouriers;
    Memory.builders = totBuilders;
    Memory.workers = totWorkers;
    Memory.transfers = totTransfer;
    Memory.warriors = totWarriors;
    Memory.squads = squads;

    /*
    if(Game.spawns.Spawn1.room.name == "sim")
    {

        Game.creeps.test.memory.role = "squadRanged"
        Game.creeps.test1.memory.role = "kMedic"
        Game.creeps.test2.memory.role = "kMedic"
        squadRanged(Game.creeps.test)

        return;
    }
    else
    {
        spawn();
        var elapsed = Game.getUsedCpu() - startCpu;
    }*/
    cpuSpawn = Game.getUsedCpu();
    spawn();
    cpuSpawn = Game.getUsedCpu() - cpuSpawn;


    //console.log("#############MEMORY USAGE#################")
    console.log("INIT: " + cpuInit);
    console.log("CREEPS: " + cpuCreeps);
    console.log("SPAWN: " + cpuSpawn);
