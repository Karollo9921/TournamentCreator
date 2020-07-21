const Tournament = require('../models/tournament.js');

exports.getCreateTournament = (req, res, next) => {
    res.render('../views/creator.ejs', {
        title: "Create Tournament"
    });
};


exports.postCreateTournament = (req, res, next) => {
    const tournament = new Tournament(req.body.discipline, req.body.type, req.body.description);
    tournament.saveToMongoDB();
    let id = tournament._id;
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)",
        id: id
    });
    return;
};


exports.getTournament = (req, res, next) => {
    Tournament.displayFromMongoDB()
        .then((tournaments) => {
            let tour = tournaments.find((item) => {return item._id == req.params.id});
            res.render('../views/tournament.ejs', {
                title: tour.discipline,
                tournament: tour
            });
        })
        .catch((err) => {
            console.log(err);
        })
};


exports.getEditTournament = (req, res, next) => {
    Tournament.displayFromMongoDB()
        .then((tournaments) => {
            let tour = tournaments.find((tours) => {return tours._id == req.params.id});
            res.render('../views/creator-edit.ejs', {
                title: "Edit Tournament",
                id: tour._id,
                discipline: tour.discipline,
                type: tour.type,
                description: tour.description
            });
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.putEditTournament = (req, res, next) => {
    try {
        Tournament.editTour(req.params.id, req.body.discipline, req.body.type, req.body.description);
        Tournament.displayFromMongoDB()
        .then((tournaments) => {
            res.render('../views/home.ejs', {
                title: "Welcome! :)",
                tournaments: tournaments
            })
        })
        .catch((err) => {
            console.log(err);
        });
    } catch {
        Tournament.displayFromMongoDB()
            .then((tournaments) => {
                let tour = tournaments.find((tours) => {return tours._id == req.params.id});
                res.render('../views/creator-edit.ejs', {
                    title: "Edit Tournament",
                    id: tour._id,
                    discipline: tour.discipline,
                    type: tour.type,
                    description: tour.description
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.deleteTournament = (req, res, next) => {
    Tournament.deleteTour(req.params.id);
    Tournament.displayFromMongoDB()
        .then(tournaments => {
            res.render('../views/home.ejs', {
                title: "Welcome! :)",
                tournaments: tournaments
            })
        })
        .catch(err => {
            console.log(err);
        })
};



 