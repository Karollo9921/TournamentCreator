const express = require('express');
const router = express.Router();

const tournaments = require('./creator.js').tournaments;


router.get('/', (req, res, next) => {
    res.render('../views/home.ejs', {
        title: "Welcome! :)",
        tournaments: tournaments
    });
});


module.exports = router;