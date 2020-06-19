const express = require('express');
const router = express.Router();

const tournaments = require('./creator.js').tournaments;


router.get('/tournaments/:id', (req, res, next) => {
    let tour = tournaments.find((item) => {return item.id == req.params.id});
    res.render('../views/tournament.ejs', {
        title: tour.discipline
    });
});


exports.router = router;