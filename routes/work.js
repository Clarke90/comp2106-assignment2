var express = require('express');
var router = express.Router();

var Hour = require('../models/hour')
var mongoose = require('mongoose');
/* GET profile page. */
router.get('/records', function(req, res, next) {
Hour.find(function(err, doc){
  if(err){
    console.log(err);
    res.end(err);
    return;
  }
else{
  console.log(doc);
  res.render('records', {
    sleep: doc,
    title:'Camper Profiles'
  });
}
  });
});


module.exports = router;
