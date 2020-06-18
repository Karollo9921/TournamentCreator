const express = require('express');
const router = express.Router();

const tournaments = require('./creator.js').tournaments;

router.get('/', (req, res, next) => {
    res.render('../views/home.ejs', {
        title: "Welcome! :)"
    });
    console.log(tournaments[0].type);
    
});

module.exports = router;