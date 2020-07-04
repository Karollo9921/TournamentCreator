const Tournament = require('../models/tournament.js');

exports.getCreateTournament = (req, res, next) => {
    res.render('../views/creator.ejs', {
        title: "Create Tournament"
    });
};


exports.postCreateTournament = (req, res, next) => {
    const tournament = new Tournament(req.body.discipline, req.body.type, req.body.description);
    tournament.saveToJSON();
    let id = tournament.id;
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)",
        id: id
    });
    return;
};


exports.getTournament = (req, res, next) => {
    Tournament.displayFromJSON((tournaments) => {
        let tour = tournaments.find((item) => {return item.id == req.params.id});
        res.render('../views/tournament.ejs', {
            title: tour.discipline,
            tournament: tour
        });        
    })
};


exports.getEditTournament = (req, res, next) => {
    Tournament.displayFromJSON((tournaments) => {
        let tour = tournaments.find((tours) => {return tours.id == req.params.id});
        res.render('../views/creator-edit.ejs', {
            title: "Edit Tournament",
            id: tour.id,
            discipline: tour.discipline,
            type: tour.type,
            description: tour.description
        });
    })
        
};

exports.putEditTournament = async (req, res, next) => {
    let editedTournaments;
    console.log(typeof req.params.id);
    try {
        editedTournaments = await Tournament.editTour(Number(req.params.id), req.body.discipline, req.body.type, req.body.description);
        console.log(editedTournaments);
        if (editedTournaments == []) {
            res.redirect('/');
        } else {
            await Tournament.displayFromJSON((tournaments) => {
                console.log(tournaments);
                res.render('../views/home.ejs', {
                    title: "Welcome! :)",
                    tournaments: tournaments
                })
            });            
        }
    } catch {
        if (editedTournaments == null) {
            res.redirect('/')
        } else {
            let tour = tournaments.find((tours) => {return tours.id === Number(req.params.id)});
            res.render('../views/creator-edit.ejs', {
                title: "Edit Tournament",
                id: tour.id,
                discipline: tour.discipline,
                type: tour.type,
                description: tour.description
            });
        }
    }
      
};

exports.deleteTournament = async (req, res, next) => {
    let newTournaments;
    newTournaments = await Tournament.deleteTour(Number(req.params.id));
    console.log(newTournaments);
    await Tournament.displayFromJSON((tournaments) => {
        res.render('../views/home.ejs', {
            title: "Welcome! :)",
            tournaments: tournaments
        })
    });
};



 