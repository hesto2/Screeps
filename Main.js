var doRoles = require("doRoles");
var spawn = require("spawn");
if(Game.rooms.length > Memory.rooms.length)Memory.rooms = Game.rooms;
spawn();
doRoles(Game.creeps);
