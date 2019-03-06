const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.create);
module.exports = router;