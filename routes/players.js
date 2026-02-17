const express = require('express');
const router = express.Router();
// import playerController
const playersController = require('../controllers/playersController');

// Define routes for player endpoints
router.get('/topscorers/:leagueId', playersController.getTopScorers);
router.get('/topassists/:leagueId', playersController.getTopAssists);
router.get('/:playerId/stats', playersController.getPlayerStats);
router.get('/fixture/:fixtureId', playersController.getFixturePlayers);

module.exports = router;