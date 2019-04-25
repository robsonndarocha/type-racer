const express = require('express');
const path = require('path');
const R = require('ramda');
const RoomManager = require('./entities/RoomManager');

const router = express.Router();

router
  .get('/room/:slug/status', (req, res, next) => {
    const room = RoomManager.findRoom(req.params.slug);

    if(!room) {
      res.status(404).json({ error: 'Room not found!' });
    }

    const players = R.map(R.pick(['name', 'ready', 'keystrokes', 'score']), room.players);

    return res.json({
      slug: room.slug,
      status: room.status,
      created: room.created,
      active_since: room.activeSince,
      active_users: room.activeUsers,
      players,
      keystrokes: room.keystrokes,
      mean: room.mean,
      below_mean: room.belowMean,
      ranking: room.ranking,
      last_minute_lead: room.lastMinuteLead
    });
  })
  .get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });

module.exports = router;
