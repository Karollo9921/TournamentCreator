const express = require('express');
const router = express.Router();

const tournamentController = require('../controllers/tournament.js');

router.get('/tournaments/:id', tournamentController.getTournament);

module.exports = router;