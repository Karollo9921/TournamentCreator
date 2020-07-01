const Tournament = require('../models/tournament.js');

exports.getHomePage = (req, res, next) => {
    Tournament.displayFromJSON((tournaments) => {
        res.render('../views/home.ejs', {
            title: "Welcome! :)",
            tournaments: tournaments
        })
    });  
};  
