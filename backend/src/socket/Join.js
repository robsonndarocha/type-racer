const R = require('ramda');

const RoomManager = require('../entities/RoomManager');

const join = (socket, player, data) => {
  player.room = data.room;
  player.name = data.name;

  const room = RoomManager.findRoom
    (player.room) || RoomManager.createRoom(player.room)
    room.addPlayer(player)
    socket.join(player.room)
    socket.to(player.room).emit('player.joined', player.publicData)
    socket.emit('self.joined', {
      quote: room.quote,
      players: R.filter(p => p.id !== player.id, room.players)
    });
}

module.exports = join;
