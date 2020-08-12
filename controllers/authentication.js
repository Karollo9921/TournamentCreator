const User = require('../models/user.js');

exports.getLogin = (req, res, next) => {
  res.render('authentication/login', {
    title: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = async (req, res, next) => {

  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  req.session.isLoggedIn = true;
  await res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
