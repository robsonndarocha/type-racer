const RoomManager = require('../entities/RoomManager');

const sendRanking = (io, player) => {
  const room = RoomManager.findRoom(player.room);
  const ranking = {};

  if(!room || !room.everyoneReady) {
    return;
  }

  room.idRanking.forEach((element, index) => 
    ranking[element[0]] = {
      score: element[1],
      position: index + 1
    }
  )

  io.in(player.room).emit('game.ranking', ranking);

  setTimeout(() => sendRanking(io, player, room), 500);
}

const ready = (socket, player, data, io) => {
  player.ready = data;

  const room = RoomManager.findRoom(player.room);

  socket.to(player.room).emit('player.ready', player.publicData);

  if(room.everyoneReady) {
    room.startGame();

    io.in(player.room).emit('game.start');

    sendRanking(io, player, room);
  }
}

module.exports = ready;
