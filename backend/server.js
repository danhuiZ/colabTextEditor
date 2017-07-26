const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');

const app = express();
mongoose.connect(process.env.MONGODB_URI, function(err) {
  if(err) {
    console.log('Error');
  } else {
    console.log('Connected :)');
  }
});

var User = require('./models.js').User;
var Document = require('./models.js').Document;


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
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
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

app.use(session({ secret: 'frank_ocean' }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { failureRedirect: '/failed' }),function(req, res) {
  console.log(req.body);
  res.json({success: true});
});

app.get('/failed', function(req, res) {
  res.json({success: false});
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
    } else {
      console.log(user);
      res.json({success: true});
    }
  });
});

app.post('/newdoc', function(req, res) {

  console.log("USER LOGGED IN ", req.user);

  // User.findOne({username: })
    var newDoc = new Document({
      title: req.body.title,
      ownerIDs: [req.user._id],
      collaboratorIDs: [req.user._id],
      hashedpassword: req.body.password
    })

    newDoc.save(function(err, doc) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('SAVED NEW DOC', doc);
      res.json({
        success: true,
        document: doc
      });
    });
})

app.get('/getdocs', function(req, res) {

  var user_id = req.user._id;
  var found_docs = [];

  Document.find({}, function( err, documents ) {
    if(err){
      res.json({
        success: false
      })
    }

    for(var i = 0; i < documents.length; i++){
      if(documents[i].collaboratorIDs.indexOf(user_id) !== -1){
        found_docs.push(documents[i]);
      }
    }

    res.json({
      success: true,
      found_docs: found_docs
    })

  })

})

// need to fix this
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
