var mongoose = require('mongoose');

//passport-local-mongoose
var plm = require('passport-local-mongoose');

//username and password schema
var accountSchema = new mongoose.Schema({});

accountSchema.plugin(plm);

module.exports = mongoose.model('Account', accountSchema);
