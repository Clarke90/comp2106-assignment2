var express = require('express');
var router = express.Router();

var Hour = require('../models/hour')

var mongoose = require('mongoose');


// Find hours and display from model controller
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
    hours: doc,
    user: req.user,
    title:'Records'
  });
}
  });

});

// Add new data to db from landpage form
router.post('/landingpage', function(req, res, next) {
   // use the model to add a new document to mongodb
   Hour.create({
      name: req.body.name,
      date: req.body.date,
      starttime: req.body.starttime,
      endtime: req.body.endtime
   },function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/records');
   });
});

// Get the page to add data
router.get('/add', function(req, res, next) {
   res.render('add', {
      title: 'Add a record'
   });
});


// Add new data to db from records page ( add.ejs )
router.post('/add', function(req, res, next){
  // use hour model
  Hour.create({
     name: req.body.name,
     date: req.body.date,
     starttime: req.body.starttime,
     endtime: req.body.endtime
  },function(err) {
     if (err) {
        console.log(err);
        res.render('error');
        return;
     }
     res.redirect('/records');
  });
});

//GET /edit/_id show edit form
router.get('/edit/:_id', function(req, res, next) {
   // look at the selected camper
    Hour.findById(req.params._id, function (err, hours) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        else{
          res.render('edit', {
              Hour: hours,
              user: req.user
          });
      }
    });
});

//Get the id of data collection and delete it
router.get('/edit/:_id', function(req, res, next) {
    Hour.remove({ _id: req.params._id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/records')
    });
});

// get the id and save the new update

router.post('/edit/:_id', function(req, res, next) {
    let hour = new Hour({
      name: req.body.name,
      date: req.body.date,
      starttime: req.body.starttime,
      endtime: req.body.endtime
    });

    //call mongoose update method,
    Hour.update({ _id: req.params._id }, hour, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/records')
    })
})





module.exports = router;
