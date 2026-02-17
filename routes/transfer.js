const express = require('express');
const router = express.Router();
const transfersController = require('../controllers/transfersController');

router.get('/latest', transfersController.getLatestTransfers);
router.get('/:playerId', transfersController.getPlayerTransfers);

module.exports = router;