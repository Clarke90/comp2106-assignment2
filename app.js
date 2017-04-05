
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

// passport dependencies
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var work = require('./routes/work');

var app = express();

// mongodb connection
var mongoose = require('mongoose');
var config = require('./config/globals');

// link cofig credentials
mongoose.connect(config.db);

//create connection
let db = mongoose.connection;
//leave connection open
db.once('open', function() {
  console.log('Connected to mongodb');

  mongoose.connection.db.collection('hours', function(err, docs) {
      // Check for error
      if(err) return console.log(err);
      // Walk through the cursor
      docs.find().each(function(err, doc) {
          // Check for error
          if(err) return console.err(err);
          // Log document
          // console.log(doc);
      })
  });
});

app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// use public folder
app.use(express.static(path.join(__dirname, 'public')));

//passport config
app.use(session({
  secret: 'random text',
    resave: true,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//use account model
var Account = require('./models/account');

passport.use(Account.createStrategy());

// add Git auth
var githubStrategy = require('passport-github').Strategy;

// configure Git auth
passport.use(new githubStrategy({
  clientID: '3c670c9ac29117bbbc4d',
  clientSecret: '2b446191de17e472fc448f47ae924f642457515a',
  callbackURL: "http://localhost:3000/github/callback"
    }, function(accessToken, refreshToken, profile, cb) {

      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (!err && user != null) { // is the github user in our db
            cb(null,  user);
          }
          else {
            // create a new user from the github profile
            user = new Account({
              oauthID: profile.id,
              username: profile.username,
              created: Date.now()
            });

            user.save(function(err, user) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
    }
));

// linkedin login

var LinkedInStrategy = require('passport-linkedin').Strategy;

passport.use(new LinkedInStrategy({
    consumerKey: '78hzrz0cy9zidi',
    consumerSecret: 'EC4T0wKl8sLb7VCs',
    callbackURL: "http://localhost:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({ linkedinId: profile.id }, function (err, user) {
     return done(err, user);
   });
  }
));

// write / read user login to our database
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//routes
app.use('/', index);
app.use('/', work);


// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found', { title: '404' });
  err.status = 404;
  next(err);
});

// run
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
