// mongoose
let mongoose = require('mongoose');

let trackerSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  date:{
    type: Date,
  },
  starttime:{
    type: Number,
  },
  endtime:{
    type: Number,
  }
});

//make the model public
module.exports = mongoose.model('Hour', trackerSchema);
