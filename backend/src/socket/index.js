const Player = require('../entities/Player');

const authentication = require('./Authentication');
const disconnect = require('./Disconnect');
const join = require('./Join');
const ready = require('./Ready');
const type = require('./Type');

const socket = (io) => {
  io.on('connection', (socket) => {
    const player = new Player(socket.id);

    socket.emit('player.token', player.token);

    socket.use((packet, next) => authentication(packet, next, player.token));

    socket.on('player.join', data => join(socket, player, data));

    socket.on('player.ready', data => ready(socket, player, data, io));

    socket.on('player.type', () => type(socket, player));

    socket.on('disconnect', () => disconnect(socket, player));
  });
}

module.exports = socket;
