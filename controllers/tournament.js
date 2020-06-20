const Tournament = require('../models/tournament.js');
const tournaments = [];

exports.getCreateTournament = (req, res, next) => {
    res.render('../views/creator.ejs', {
        title: "Create Tournament"
    });
};

exports.postCreateTournament = (req, res, next) => {
    const tournament = new Tournament(req.body.discipline, req.body.type, req.body.description);
    tournaments.push(tournament);
    let id = tournament.id;
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)",
        id: id
    });
    return;
};

exports.getTournament = (req, res, next) => {
    let tour = tournaments.find((item) => {return item.id == req.params.id});
    res.render('../views/tournament.ejs', {
        title: tour.discipline
    });
};

exports.tournaments = tournaments;
