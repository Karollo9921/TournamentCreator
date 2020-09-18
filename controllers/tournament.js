const Tournament = require('../models/tournament.js');
const User = require('../models/user.js');
ObjectId = require('mongodb').ObjectID;

exports.getCreateTournament = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    User.find({}).exec((err, users) => {   
        if (err) throw err;
        res.render('../views/creator.ejs', { 
            title: "Create Tournament",
            isAuthenticated: req.session.isLoggedIn,
            users: users,
            loggedUser: req.session.user 
        });
    });
};


exports.postCreateTournament = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    const tournament = new Tournament({
        discipline: req.body.discipline,
        type: req.body.type,
        description: req.body.description,
        author: req.session.user._id,
        players: await Promise.all(req.body.usersLogins.map(async userLogin => {
                    try {
                        const user = await User.find({ login: userLogin });
                        return ObjectId(user[0]._id);
                    } catch (err) {
                        console.log(err);
                    }
                    })
                )
    });
    await tournament.save();
    let id = tournament._id;
    User.findById(req.session.user._id)
        .then(user => {
            user.createdTournaments.push(id);
            return user.save();
        })
        .catch(err => {
            console.log(err);
        })
    // console.log(tournaments);
    res.render('../views/success.ejs', {
        title: "SUCCESS ! ;)",
        id: id,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: req.session.user
    });
    return;
};


exports.getTournament = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    Tournament.find()
        .populate('players')
        .populate('author')
        .then((tournaments) => {
            let tour = tournaments.find((item) => {return item._id == req.params.id});
            res.render('../views/tournament.ejs', {
                title: tour.discipline,
                tournament: tour,
                isAuthenticated: req.session.isLoggedIn,
                loggedUser: req.session.user,
                players: tour.players,
                author: tour.author
            });
        })
        .catch((err) => {
            console.log(err);
        })
};


exports.getEditTournament = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    Tournament.find()
        .then((tournaments) => {
            let tour = tournaments.find((tours) => {return tours._id == req.params.id});
            res.render('../views/creator-edit.ejs', {
                title: "Edit Tournament",
                id: tour._id,
                discipline: tour.discipline,
                type: tour.type,
                description: tour.description,
                isAuthenticated: req.session.isLoggedIn,
                loggedUser: req.session.user
            });
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.putEditTournament = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
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
            isAuthenticated: req.session.isLoggedIn,
            loggedUser: req.session.user
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteTournament = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    await Tournament.findByIdAndDelete(req.params.id);
    await Tournament.find()
        .then(tournaments => {
            res.render('../views/home.ejs', {
                title: "Welcome! :)",
                tournaments: tournaments,
                isAuthenticated: req.session.isLoggedIn,
                loggedUser: req.session.user
            })
        })
        .catch(err => {
            console.log(err);
        })
};



 