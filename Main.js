
//Add source keeper array and have creeps auto avoid it in moveTo function
//Add new spawn code that allows spawns to give units to different rooms and work together
//Have worker creeps add themselves to a room variable array that says they are available, tell transfer creeps to move to that and set them as their target. Pop them off the array after claiming them
// Optimize FIND AND ATTACK
//Change where transfers go to by default
//Use new room strucuters object to maximize repair and transfer efficiency. Eventually set it up to maximize squad attack logic
//Fix guard bug where guards go to wrong flag
console.log("**********************************************************************")
var doRoles = require('doRoles')
var prototypes = require('prototypes')
var rooms = require('rooms')
var spawn = require('spawn')
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
    //Init Rooms
    var couriers = {}
    var builders = {}
    var workers = {}
    var transfers = {}
    var keeperKillers = {}
    var kMedics = {}
    var linkWorkers = {}
    var repairs = {}
    var nomads = {}
    var guards = []

    var squads = []

    var squadGroups = {}
    squadGroups[1] = {}
    squadGroups[1].medic = {}
    squadGroups[1].melee = {}
    squadGroups[1].ranged = {}
    squadGroups[2] = {}
    squadGroups[2].medic = {}
    squadGroups[2].melee = {}
    squadGroups[2].ranged = {}
    squadGroups[3] = {}
    squadGroups[3].medic = {}
    squadGroups[3].melee = {}
    squadGroups[3].ranged = {}
    Memory.spawns = Game.spawns


    if(Game.time == 20815424){Game.rooms.E2S6.createConstructionSite(24, 17, STRUCTURE_RAMPART)
        Game.rooms.E2S6.createFlag(24, 17, 'Guard-E2S6-1',COLOR_RED)
    }
    var cpuRooms = Game.getUsedCpu();
    rooms()
    test()


    console.log("ROOMS: " + (Game.getUsedCpu() - cpuRooms) )
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //if(creep.fatigue > 0)continue;
        if(creep.memory.room == undefined){
            creep.memory.room = creep.room
        }
        var room = Game.rooms[creep.memory.room.name]

        if(creep.memory.role == "courier")
        {
            couriers[creep.name] = creep
            room.memory.couriers.push(creep);
        }
        else if(creep.memory.role == "squad"){
            squads.push(creep);
            squadGroups[creep.memory.squad][creep.memory.task][creep.name] = creep
            room.memory.squads.push(creep);
        }
        else if(creep.memory.role == 'builder') {
            builders[creep.name] = creep
            room.memory.builders.push(creep);
        }
        else if(creep.memory.role == 'worker') {
            workers[creep.name] = creep
            room.memory.workers.push(creep);
        }
        else if(creep.memory.role == 'transfer') {
            transfers[creep.name] = creep
            room.memory.transfers.push(creep);
        }
        else if(creep.memory.role == "keeperKiller"){
          keeperKillers[creep.name] = creep
          room.memory.keeperKillers.push(creep);
        }
        else if(creep.memory.role == "kMedic"){
          kMedics[creep.name] = creep
          room.memory.kMedics.push(creep);
        }
        else if(creep.memory.role == "linkWorker"){
          linkWorkers[creep.name] = creep
          room.memory.linkWorkers.push(creep);
        }
        else if(creep.memory.role == "repair"){
            repairs[creep.name] = creep
            room.memory.repairs.push(creep);
        }
        else if(creep.memory.role == "nomad"){
            nomads[creep.name] = creep
            room.memory.nomads.push(creep)
        }
        else if(creep.memory.role == "guard"){
            guards[creep.name] = creep
            room.memory.guards.push(creep)
        }
        if(creep.name == "test"){
            creep.moveTo(Game.flags.TEST)
        }

    }

    Memory.guards = guards
    Memory.couriers = couriers
    Memory.builders = builders
    Memory.workers = workers
    Memory.transfers = transfers
    Memory.keeperKillers = keeperKillers
    Memory.kMedics = kMedics
    Memory.linkWorkers = linkWorkers
    Memory.repairs = repairs
    Memory.nomads = nomads
    Memory.squads = squads;




    doRoles()

    cpuSpawn = Game.getUsedCpu();
    spawn();
    cpuSpawn = Game.getUsedCpu() - cpuSpawn;


    //console.log("#############MEMORY USAGE#################")
    console.log("SPAWN: " + cpuSpawn);

function test(){




}
