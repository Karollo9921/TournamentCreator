const Tournament = require('../models/tournament.js');
const User = require('../models/user.js');

exports.getUser = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    User.find()
      .populate('createdTournaments')
      .then((users) => {
        let user = users.find((user) => {return user._id == req.params.id});
        res.render('../views/user.ejs', {
          title: user.login,
          isAuthenticated: req.session.isLoggedIn,
          loggedUser: req.session.user,
          user: user
          });
        })
      .catch((err) => {
          console.log(err);
      })
};
