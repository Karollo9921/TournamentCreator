const express = require('express');
const router = express.Router();

const tournamentController = require('../controllers/tournament.js');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/creator', tournamentController.getCreateTournament);
router.post('/creator', tournamentController.postCreateTournament);

router.get('/creator-edit/:id', tournamentController.getEditTournament);

module.exports = router;