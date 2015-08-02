/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototypes'); // -> 'a thing'
 */
 module.exports = function(){

     Room.prototype.findHostileCreeps = function(){
         if(this.memory == undefined)return []
         var creeps = []
         var room = this
         this.find(FIND_HOSTILE_CREEPS, {filter:function(object){
			if(object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username != 'hesto2')
			{

			        if(object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0 || object.getActiveBodyparts(HEAL) > 0){
			            room.memory.armedHostiles.push(object)

			        }
					creeps.push(object)
			}
		}})
		return creeps;
     }
     Room.prototype.getStructures = function(){
            var ramparts = []
            var links = {}
                links.sourceLinks = []
                links.nodes = []
            var walls = []
            var roads = []
            var extensions = []
            var spawns = []
            var needsEnergy = []
            var needsRepair = {}
            var lairs = []
            var sources = []


            needsRepair.ramparts = []
            needsRepair.links = []
            needsRepair.walls = []
            needsRepair.roads = []
            needsRepair.extensions = []
            needsRepair.spawns = []

            this.find(FIND_SOURCES,{filter:function(object){
                sources.push(object.id)
            }})
            this.find(FIND_HOSTILE_STRUCTURES,{filter:function(object){
                if(object.structureType == STRUCTURE_KEEPER_LAIR){
                    lairs.push(object.id)
                }
            }})


            this.find(FIND_STRUCTURES,{filter: function(object){
                var threshold

                if(object.structureType == STRUCTURE_SPAWN){
                    spawns.push(object.id)
                      threshold = object.hitsMax
                      if(object.energy < object.energyCapacity){
                          needsEnergy.push(object.id)
                      }
                     if(object.hits < threshold){
                        needsRepair.spawns.push(object.id)
                     }
                }
                else if(object.structureType == STRUCTURE_EXTENSION){
                    extensions.push(object.id)
                    threshold = object.hitsMax
                    if(object.energy < object.energyCapacity){
                          needsEnergy.push(object.id)
                      }
                    if(object.hits < threshold){
                        needsRepair.extensions.push(object.id)
                     }
                }
                else if(object.structureType == STRUCTURE_LINK){
                    threshold = object.hitsMax

                    var type = checkLink(object.id,sources)
                    if(type == 'controller'){
                        links.controller = object.id
                    }
                    else if(type == 'source'){
                        links.sourceLinks.push(object.id)
                    }
                    else if(type == 'node'){
                        links.nodes.push(object.id)
                    }


                    if(object.hits < threshold){
                        needsRepair.links.push(object.id)
                     }
                }
                else if(object.structureType == STRUCTURE_ROAD){
                    roads.push(object.id)
                    threshold = object.hitsMax*.75
                    if(object.hits < threshold){
                        needsRepair.roads.push(object.id)
                     }
                }
                else if(object.structureType == STRUCTURE_RAMPART){
                    ramparts.push(object.id)
                    threshold = object.hitsMax*.8
                    if(object.hits < threshold){
                        needsRepair.ramparts.push(object.id)
                     }
                }
                else if(object.structureType == STRUCTURE_WALL){
                    walls.push(object.id)
                    threshold = object.hitsMax*.2
                    if(object.hits < threshold){
                        needsRepair.walls.push(object.id)
                     }
                }


            }})





            this.memory.structures.ramparts = ramparts
            this.memory.structures.walls = walls
            this.memory.structures.roads = roads
            this.memory.structures.links = links
            this.memory.structures.spawns = spawns
            this.memory.structures.extensions = extensions
            this.memory.structures.needsEnergy = needsEnergy
            this.memory.structures.needRepair = needsRepair
            this.memory.sources = sources


     }
     RoomPosition.prototype.findEnemiesInAttackRange = function(opts) {
         if(this.room.memory.hostileCreeps != undefined){
            if(this.room.memory.armedHostiles.length > 0){
                targets = this.room.memory.armedHostiles
            }
            else{
                targets = this.room.memory.hostileCreeps
            }
            return this.pos.findInRange(targets, 3, opts);
         }
         }
    Creep.prototype.pickupDropped = function(){
        var targets = this.room.memory.droppedEnergy
        if(targets.length > 0){
            if(this.pos.isNearTo(targets[0])){
                this.pickup(targets[0])
            }
        }
    }
    Creep.prototype.findFlag = function(room,name){
        var flags = room.find(FIND_FLAGS)
        for(var flag in flags){
            flag = flags[flag]
            if(flag.name.indexOf(name) > -1){
                return flag
            }
        }
    }
    Creep.prototype.harvestAtFlag = function(flag,creep){
        if(this.pos.isNearTo(flag)){
                var source = this.room.lookForAt('source',flag.pos)
                this.harvest(source)
                this.memory.task = 'harvesting'
                if(this.energy == this.energyCapacity)
                {
                    this.memory.task = "done"
                }
            }
            else{
                this.moveTo(flag)
            }
    }

    Creep.prototype.findAndAttack = function(){
        var method;
        var targets;

        //Choose what targets to go for
        if(this.room.memory.armedHostiles.length > 0){
            targets = this.room.memory.armedHostiles
        }
        else if(this.room.memory.hostileCreeps.length > 0){
            targets = this.room.memory.hostileCreeps
        }
        else{
            return;
        }
        //Determine which method to use
        if(targets.length < 5){
            method = 'astar'
        }
        else{
            method = 'dijkstra'
        }

        //Assign target and based off of what tools you have, move to Target
        var target = this.pos.findClosest(this.room.memory.hostileCreeps)
        var partsAttack = this.getActiveBodyparts(ATTACK)
        var partsRanged = this.getActiveBodyparts(RANGED_ATTACK)
        if(partsAttack > 0 || (partsAttack > 0 && partsRanged > 0)){
                if(this.pos.isNearTo(target)){
                    this.attack(target)
                }
                else{
                    this.moveTo(target)
                }

                if(partsRanged > 0){
                    if(this.pos.inRangeTo(target,3)){
                        this.rangedAttack(target)
                    }
                }
        }
        else if(partsRanged > 0){
            this.kite(2,target)
            if(target==null)return
            if(this.pos.inRangeTo(target,3)){
                        this.rangedAttack(target)
              }
        }
        else{
            this.kite(4,target)
        }
    }

    Creep.prototype.kite = function(distance,target){
        if(target == null){return}

        if(this.pos.inRangeTo(target,distance)){
            this.moveTo(this.pos.x + this.pos.x - target.pos.x, this.pos.y + this.pos.y - target.pos.y );
        }
        else{
            this.moveTo(target)
        }
    }

    Creep.prototype.depositEnergy = function(){

        var cpu = Game.getUsedCpu()
        var target
        var spawn = Game.getObjectById(creep.memory.home.id)
        var extensions = creep.room.memory.structures.extensions
        var spawns = creep.room.memory.structures.spawns


	       if(this.room.memory.roomEnergy < this.room.memory.energyCapacity ){
                var targets = []
                for(var structure in this.room.memory.structures.needsEnergy)
                {
                    structure = this.room.memory.structures.needsEnergy[structure]
                    structure = Game.getObjectById(structure)
                    targets.push(structure)
                }

                     task = 'assign target extension'
    	            target = this.pos.findClosest(targets)

    	          if(target == null)
    	          target = targets[0]
	        }

	        else
	        {
	           return
	            task = 'assign target courier'
	            target = this.pos.findClosest(this.room.memory.couriers,{filter:function(object){
	                if(object.memory.role != undefined)
	                if(object.memory.role == 'courier' && object.energy < object.energyCapacity){
	                    return object
	                }
	            }})
	            if(target){
	                target = target
	            }
	            else{
	                return
	            }
	        }



	        if(this.pos.isNearTo(target)){
	            this.transferEnergy(target)
	        }
	        else{
	            this.moveTo(target,{reusePath:20})
	           // printElapsed(cpu)
	        }


    }

    Creep.prototype.getDropped = function(){
        if(creep.energy == creep.energyCapacity)return
        var dropped = creep.pos.findClosest(creep.room.memory.droppedEnergy,{method:'astar'})
         if(creep.pos.isNearTo(dropped))
     	{
     	    creep.pickup(dropped);
     	}
    }

 }

 function checkLink(link,sources){
    link = Game.getObjectById(link)
    var linkPos = link.pos

    if(linkPos.inRangeTo(link.room.controller,3)){
			return 'controller'
	}
	else{
	    for(var source in sources){
	        source = Game.getObjectById(sources[source])
	        if(linkPos.inRangeTo(source,4)){
	            return 'source'
	        }
	    }
	    return 'node'
	}
 }
 function checkWall(wall,lairs){

 }

 function printElapsed(cpu){
     console.log(Game.getUsedCpu() - cpu)
 }
 
