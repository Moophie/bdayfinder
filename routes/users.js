var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/getUserFromToken', authController.getUserFromToken);
router.post('/getAllUsers', authController.getAllUsers);
router.post('/getUsersByBirthday', authController.getUsersByBirthday);

module.exports = router;
