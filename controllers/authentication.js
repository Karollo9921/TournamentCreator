const User = require('../models/user.js');

const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('authentication/login', {
    title: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getSignup = (req, res, next) => {
  res.render('authentication/signup', {
    title: 'Signup',
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.postLogin = async (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  const loginEmail = req.body.login;
  const password = req.body.password;
  User.find({$or: [{email: loginEmail}, {login: loginEmail}]})
    .then((user) => {
      if (user[0]) {
        // console.log(user);
        // console.log(password, user[0].password);
        bcrypt
          .compare(password, user[0].password)
          .then((positiveCompare) => {
            if (positiveCompare) {
              req.session.user = user[0];
              req.session.isLoggedIn = true;
              return req.session.save((err) => {
                // console.log(err);
                res.redirect('/');
              })
            } else {
              return res.redirect('/login');
            }
          })
          .catch((err) => {
            console.log(err); 
            return res.redirect('/login');
          })
      } else {
        return res.redirect('/login');
      }
    })
    .catch((err) => {console.log(err);})
    
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const login = req.body.login;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (password !== password2) {
    return res.redirect('/signup');
  }
  User.find({$or: [{email: email}, {login: login}]})
    .then(foundUser => {
      // console.log(foundUser);
      if (foundUser[0]) {
        return res.redirect('/signup')
      }
      return bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          email: email,
          login: login,
          password: hashedPassword,
          createdTournaments: []
        });
        return user.save();
      })
    })
    .then((user) => {res.redirect('/')})
    .catch((err) => {console.log(err);})

  
};