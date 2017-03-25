// mongoose
let mongoose = require('mongoose');

let camperSchema = new mongoose.Schema({
  name:{
    type: String,
    required: 'First Name is Required'
  },
  date:{
    type: Number,
    required: 'First Name is Required'
  },
  starttime:{
    type: Number,
    required: 'Last Name is required'
  }
});

//make the model public
module.exports = mongoose.model('Camper', camperSchema);
