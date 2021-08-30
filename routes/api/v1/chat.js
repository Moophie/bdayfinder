var express = require('express');
var router = express.Router();
var chatController = require('../../../controllers/api/v1/chat');

router.get('/chat', chatController.getAllMessages);
router.post('/chat', chatController.sendMessage);

module.exports = router;