var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'test',
    user:req.user
  });
});

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

// /* GET add page */
// router.get('/add', function(req, res, next){
//     res.render('add', { title:'Add'});
// });

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
      messages: messages,
      user: req.user
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

//GET Logout handler
router.get('/logout', function(req,res, next ){
  req.logout();
  res.redirect('/');
})

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/landingpage',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
      // res.redirect('/users/' + req.user.username);
}));


module.exports = router;
