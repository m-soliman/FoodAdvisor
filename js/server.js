var express = require('express');
var app = express();
var session = require('express-session');
var uuid = require('uuid');
var bodyParser = require('body-parser');

var users = {maria: {name: 'maria', pass:'12345'}};

app.use(session({
  genid: function (req) {
    return uuid.v4();
  },
  secret: 'Pink fluffy unicorns dancing on rainbows'
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'jade');
app.set('view options', { debug: true });
app.disable('view cache');

app.get('/', function (req, res) {
  res.render('index', {pageTitle: 'Index'});
});

app.get('/partials/home', function (req, res) {
  res.render('home', {});
});

app.get('/partials/login', function (req, res) {
  res.render('login', {});
});

app.post('/login', function (req, res) {
  console.log('user '+req.body.username);
  console.log('pass: '+req.body.password);

  if (req.body.username in users && users[req.body.username].pass == req.body.password) {
    res.json({success: true});
  }
  res.json({success: false});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
