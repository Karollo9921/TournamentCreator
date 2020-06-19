const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const Tournament = require('../models/tournament.js')
const tournaments = [];

router.get('/creator', (req, res, next) => {
    res.render('../views/creator.ejs', {
        title: "Create Tournament"
    });
});

router.post('/creator', (req, res, next) => {
    const tournament = new Tournament(req.body.discipline, req.body.type, req.body.description);
    tournaments.push(tournament);
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)"
    });
    return;
    
});

exports.router = router;
exports.tournaments = tournaments;


