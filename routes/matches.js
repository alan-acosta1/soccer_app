// Import Express
const express = require('express');

// Create a router instance to handle routes
const router = express.Router();

// Import matchesController
const matchesController = require('../controllers/matchesController')

//Defines routes for matches endpoints
router.get('/live',matchesController.getLiveMatches);
router.get('/date/:date',matchesController.getMatchesByDate);
router.get('/league/:leagueId',matchesController.getMatchesByLeague);

// export router for server.js use
module.exports = router;