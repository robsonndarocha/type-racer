const R = require('ramda');
const uuid = require('uuid');

const RoomManager = require('./RoomManager');

class Player {
  constructor(id) {
    this.id = id;
    this.name = '';
    this.ready = false;
    this.token = uuid();
    this.keystrokes = 0;
    this.room = null;
  }

  incKeystrokes() {
    this.keystrokes = R.inc(this.keystrokes);
  }

  get score() {
    const room = RoomManager.findRoom(this.room);

    return Math.round(this.keystrokes * 60) / room.activeSince || 0;
  }

  get publicData() {
    return R.pick(['id', 'name', 'ready', 'keystrokes', 'score'])(this);
  }
}

module.exports = Player;
