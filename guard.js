/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 module.exports = function(creep){
    var flag = creep.memory.target

    flag = Game.getObjectById(flag.id)
    if(flag != null)
    if(creep.pos != flag.pos){
        creep.moveTo(flag)
    }
    //Attack enemies in range
    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if(targets.length > 0) {
        creep.rangedAttack(targets[0]);
        creep.attack(targets[0])
    }
 }
