
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

// passport dependencies
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');


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





// run
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
