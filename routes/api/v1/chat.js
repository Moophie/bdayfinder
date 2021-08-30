var express = require('express');
var router = express.Router();
var chatController = require('../../../controllers/api/v1/chat');

router.get('/', chatController.getAllMessages);
router.post('/', chatController.sendMessage);
router.get('/birthday/:birthday', chatController.getChatroom);

module.exports = router;