const express = require('express');

const router = express.Router();

//import leaguesController
const leaguesController = require('../controllers/leaguesController');

//Define routes for league endpoints
router.get('/popular',leaguesController.getPopularLeagues);
router.get('/:leagueId/standings',leaguesController.getLeagueStandings);
router.get('/all',leaguesController.getAllLeagues);

//exports for server.js to use
module.exports = router;



