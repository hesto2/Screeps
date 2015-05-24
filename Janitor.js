/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Janitor'); // -> 'a thing'
 */
 module.exports = function(creep){
     var spawn = Game.spawns.Spawn1;
     var target = creep.pos.findClosest(FIND_DROPPED_ENERGY);
     var ePath = creep.room.findPath(creep, target);
     var sPath = creep.room.findPath(creep, spawn);
     if(target)
     {
         if(creep.energy > 0 && ePath.length < sPath.length)
         {
             //Go get the energy
             creep.moveTo(target)
             creep.pickup(target);
         }
         else
         {
             //Go drop it off
             creep.moveTo(spawn);
             creep.transferEnergy(spawn);
         }
     }
     
 }