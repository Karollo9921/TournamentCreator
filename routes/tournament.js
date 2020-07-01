const express = require('express');
const router = express.Router();

const tournamentController = require('../controllers/tournament.js');

router.get('/tournaments/:id', tournamentController.getTournament);
router.put('/creator-edit/:id', tournamentController.putEditTournament);
router.delete('/:id', tournamentController.deleteTournament);


module.exports = router;