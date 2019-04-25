const R = require('ramda');
const Room = require('./Room');

class RoomManager {
  constructor() {
    this.rooms = [];
  }

  createRoom(slug) {
    this.rooms = R.append(new Room(slug), this.rooms);

    return this.findRoom(slug);
  }

  removeRoom(slug) {
    this.rooms = R.reject(R.propEq('slug', slug), this.rooms);
  }

  findRoom(slug) {
    return R.find(R.propEq('slug', slug), this.rooms);
  }
}

module.exports = new RoomManager();
