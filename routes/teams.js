const express = require('express');

const router = express.Router();

//import teamsController
const teamsController = require('../controllers/teamsController');

//Define routes for teams endpoints
router.get('/:teamId/fixtures',teamsController.getTeamFixtures);
router.get('/:teamId/squad', teamsController.getTeamSquad);
router.get('/:teamId/stats',teamsController.getTeamStats);
router.get('/:teamId/headtohead/:opponentId', teamsController.getHeadtoHead);
module.exports = router;