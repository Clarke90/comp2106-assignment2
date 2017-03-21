var express = require('express');
var router = express.Router();

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

module.exports = router;
