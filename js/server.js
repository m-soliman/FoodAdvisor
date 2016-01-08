var express = require('express');
var app = express();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var uuid = require('uuid');

var users = {maria: {name: 'maria', pass:'12345'}};

passport.use(new localStrategy(
  function(username, password, done) {
    if (user in users && password == users[user].pass) {
      return done(null, users[user]);
    }
    return done(null, false, {message: 'Ächts!'});
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.name);
});

passport.deserializeUser(function(id, done) {
  done(null, users[id]);
});

app.use(session({
  genid: function (req) {
    return uuid.v4();
  },
  secret: 'Pink fluffy unicorns dancing on rainbows'
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine', 'jade');
app.set('view options', { debug: true });
app.disable('view cache');

app.get('/', function (req, res) {
  res.render('index', {pageTitle: 'Index'});
});

app.get('/login', function (req, res) {
  res.render('login', {pageTitle: 'Login'});
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
