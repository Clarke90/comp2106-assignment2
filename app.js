
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
