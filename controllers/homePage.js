const tournaments = require('./tournament').tournaments;


exports.getHomePage = (req, res, next) => {
    res.render('../views/home.ejs', {
        title: "Welcome! :)",
        tournaments: tournaments
    });
};

