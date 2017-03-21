
var express = require('express');
var app = express();
var path = require('path');
var index = require('./routes/index');

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
// use public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// run
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
