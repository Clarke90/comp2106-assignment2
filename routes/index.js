var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account')
var LinkedInStrategy = require('passport-linkedin').Strategy;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'test',
    user:req.user
  });
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Please Register',
      user: req.user
  });
});

///Register page
router.post('/register', function(req, res, next){
  //use the Account model to create a new user
  Account.register(new Account({ username: req.body.username }), req.body.password,
  function(err, account){
    if(err){
      console.log(err);
      res.redirect('/error') //fail
    }
    else{
      res.redirect('/login')
    }
  });
});

// GET login
router.get('/login', function(req, res, next){

  // create a variable to store any login messages
      var messages = req.session.messages || [] ;


  if (req.user) {
      res.redirect('/records');
  }
else{
  res.render('login', {
    title:'Login',
      messages: messages,
      user: req.user
      });
    }
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/landingpage',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
}));

/* GET stats page. */
router.get('/stats', function(req, res, next){
  res.render('stats', { title:'Stats'});
});

/* GET records page. */
router.get('/landingpage', function(req, res, next){
  res.render('landingpage', {
    title:'Hello!',
    user: req.user
  });
});

/* GET error page */
router.get('/error', function(req, res, next){
    res.render('error', { title:'Youve got an ERROR'});
});

//GET Logout handler
router.get('/logout', function(req,res, next ){
  req.logout();
  res.redirect('/');
})

/* GET /github - show github login popup */
router.get('/github', passport.authenticate('github'));

/* GET /github/callback */
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  res.redirect('/landingpage');
});

// Get /LinkedIn
router.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

  router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
