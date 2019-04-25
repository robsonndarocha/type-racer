const R = require('ramda');

const quotes = require('./../library/quotes.json');

class Room {
  constructor(slug) {
    this.slug = slug;
    this.players = [];
    this.players.status = 'stopped';
    this.created = Date.now();
    this.quote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  addPlayer(player) {
    this.players = R.append(player, this.players);
  }

  getPlayer(id) {
    return R.find(R.propEq('id', id))(this.players);
  }

  removePlayer(id) {
    this.players = R.reject(player => player.id === id, this.players);

    return this.players;
  }

  startGame() {
    this.status = 'running';

    return this.quote;
  }

  get everyoneReady() {
    return R.all(R.propEq('ready', true))(this.players);
  }

  get activeUsers() {
    return this.players.length;
  }

  get keystrokes() {
    const getKeystrokes = item => R.prop('keystrokes', item);
    const sumKeystrokes = (total, item) => R.sum([total, getKeystrokes(item)]);

    return R.reduce(sumKeystrokes, 0)(this.players);
  }

  get activeSince() {
    return Math.floor((Date.now() - this.created) / 1000);
  }

  get mean() {
    return R.pipe(R.map(R.prop('score')), R.mean)(this.players);
  }

  get belowMean() {
    return R.length(R.pipe(R.map(R.prop('score')), R.filter(R.lt(R.__, this.mean)))(this.players));
  }

  get ranking () {
    const players = R.map(R.pipe(R.pick(['name', 'score']), R.values))(this.players);

    return R.reverse(R.sortBy(R.last) (players));
  }

  get idRanking() {
    const players = R.map(R.pipe(R.pick(['id', 'score']), R.values))(this.players);

    return R.reverse(R.sortBy(R.last)(players));
  }

  get lastMinuteLead() {
    return R.head(R.head(this.ranking));
  }
}

module.exports = Room;
