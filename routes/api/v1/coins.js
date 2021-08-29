var express = require('express');
var router = express.Router();
var coinsController = require('../../../controllers/api/v1/coins');

router.get('/transfers', coinsController.getAllTransfers);
router.get('/transfers/:id', coinsController.getOneTransfer);
router.post('/transfers', coinsController.postTransfer);

router.get('/leaderboard', coinsController.getLeaderboard);

module.exports = router;