const express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
const app = express();

var User = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PASSPORT FLOW

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  console.log('this is the user name', username);
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log('shit boy');
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', passport);

// PASSPORT FLOW

// Example route
app.get('/', function (req, res) {
  res.send('i got here because i failed');
});

// need to fix redirects as well
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),function(req, res) {
  console.log(req.body);
  res.send(200);
});

// need to fix this
app.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(user);
    res.redirect('/login');
  });
  res.sendStatus(200);
});

// need to fix this
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
