const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');

router.get('/users/:id', userController.getUser);

module.exports = router;