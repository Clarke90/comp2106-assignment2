var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'test' });
});

/* GET stats page. */
router.get('/stats', function(req, res, next){
  res.render('stats', { title:'Stats'});
});

/* GET records page. */
router.get('/records', function(req, res, next){
  res.render('records', { title:'Records'});
});

/* GET records page. */
router.get('/landingpage', function(req, res, next){
  res.render('landingpage', { title:'Hello!'});
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Please Register',
      user: req.user
  });
});

// GET login
router.get('/login', function(req, res, next){
  // create a variable to store any login messages
      var messages = req.session.messages || [] ;

  res.render('login', {
    title:'Login',
      messages: messages
      });
});

///Register page
router.post('/register', function(req, res, next){
  // res.render('register', { title:'Register'});
  //use the Account model to create a new user
  Account.register(new Account({ username: req.body.username }), req.body.password,
  function(err, account){
    if(err){
      console.log(err);
    }
    res.redirect('/landingpage') //success
  });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/staff-dashboard',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));


module.exports = router;
