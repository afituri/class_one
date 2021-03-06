var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  easyPbkdf2 = require("easy-pbkdf2")();
var models = require('../models');
//read the passport api docs if you wanna know what this does
passport.use(new LocalStrategy(
  function (username, password, done) {
    findByUserName(username, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      authenticate(user, password, function (valid) {
        if (valid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

//read the passport api docs if you wanna know what this does
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//read the passport api docs if you wanna know what this does
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (router) {
  //login here we get the email and password and check if they're conrrect
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/?msg=1'
  }), function (req, res) {
    findById(req.session.passport.user, function (err, user) {
      req.session.idu = user[0].id;
      req.session.name = user[0].name;
      res.redirect('/home');
    });
  });
  // here if a user wants to logout of the app
  router.get('/logout', ensureAuthenticated, function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });
  return router;
}

function findById(id, fn) {
  models.User.findAll({
    where: {
      id: id,
      status: 1
    }
  })
  .then(function (user) {
    if (user) {
      fn(null, user);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}

function findByUserName(username, fn) {
  models.User.findAll({
    where: {
      email: username,
      status: 1
    }
  })
  .then(function (user) {
    if (user) {
      return fn(null, user[0]);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate(user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify(user.salt, user.password, userEnteredPassword, function (err, valid) {
    if (err) {
      console.log(err);
    } else {
      callback(valid);
    }
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}
