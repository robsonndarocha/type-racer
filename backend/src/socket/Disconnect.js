const RoomManager = require('../entities/RoomManager');

const disconnect = (socket, player) => {
  const room = RoomManager.findRoom(player.room);

  if(room) {
    room.removePlayer(player.id);

    if(room.activeUsers === 0) {
      RoomManager.removeRoom(player.room);
    } else {
      socket.to(player.room).emit('player.left', player.id);
    }
  }
}

module.exports = disconnect;
