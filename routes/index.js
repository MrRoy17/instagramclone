var express = require('express');
var router = express.Router();

const userModel = require('./users');
const passport = require('passport');

router.get('/', function (req, res) {
  res.render('index', { footer: false });
});

router.get('/login', function (req, res) {
  res.render('login', { footer: false });
});

router.get('/feed', function (req, res) {
  res.render('feed', { footer: true });
});

router.get('/profile', function (req, res) {
  res.render('profile', { footer: true });
});

router.get('/search', function (req, res) {
  res.render('search', { footer: true });
});

router.get('/edit', function (req, res) {
  res.render('edit', { footer: true });
});

router.get('/upload', function (req, res) {
  res.render('upload', { footer: true });
});

module.exports = router;

// add these two lines at top
const localStrategy = require("passport-local");
passport.use(new localStrategy
  (userModel.authenticate(
  )));

// register route
router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  passport.authenticate("local")
    (req, res, function () {
      userModel.register(userdata, req.body.password)
        .then(function (registereduser) {
          res.redirect('/profile');
        })
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res) { })