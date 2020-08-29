const Tournament = require('../models/tournament.js');

exports.getHomePage = (req, res, next) => {
    Tournament.find()
        .then((tournaments) => {
            res.render('../views/home.ejs', {
                title: "Welcome! :)",
                tournaments: tournaments,
                isAuthenticated: req.session.isLoggedIn,
                loggedUser: req.session.user
            })
        })
        .catch((err) => {
            console.log(err);
        });
};  
