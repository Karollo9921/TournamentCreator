const Tournament = require('../models/tournament.js');

exports.getCreateTournament = (req, res, next) => {
    res.render('../views/creator.ejs', {
        title: "Create Tournament",
        isAuthenticated: req.session.isLoggedIn
    });
};


exports.postCreateTournament = (req, res, next) => {
    const tournament = new Tournament({
        discipline: req.body.discipline,
        type: req.body.type, 
        description: req.body.description
    });
    tournament.save();
    let id = tournament._id;
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)",
        id: id,
        isAuthenticated: req.session.isLoggedIn
    });
    return;
};


exports.getTournament = (req, res, next) => {
    Tournament.find()
        .then((tournaments) => {
            let tour = tournaments.find((item) => {return item._id == req.params.id});
            res.render('../views/tournament.ejs', {
                title: tour.discipline,
                tournament: tour,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch((err) => {
            console.log(err);
        })
};


exports.getEditTournament = (req, res, next) => {
    Tournament.find()
        .then((tournaments) => {
            let tour = tournaments.find((tours) => {return tours._id == req.params.id});
            res.render('../views/creator-edit.ejs', {
                title: "Edit Tournament",
                id: tour._id,
                discipline: tour.discipline,
                type: tour.type,
                description: tour.description,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.putEditTournament = (req, res, next) => {
    const tourId = req.params.id;
    Tournament.findById(tourId)
        .then(tour => {
            tour.discipline = req.body.discipline,
            tour.type = req.body.type, 
            tour.description = req.body.description,
            tour.lastEdit = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                        + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
            return tour.save();
        });
    Tournament.find()
    .then((tournaments) => {
        res.render('../views/home.ejs', {
            title: "Welcome! :)",
            tournaments: tournaments,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteTournament = async (req, res, next) => {
    await Tournament.findByIdAndDelete(req.params.id);
    await Tournament.find()
        .then(tournaments => {
            res.render('../views/home.ejs', {
                title: "Welcome! :)",
                tournaments: tournaments,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        })
};



 