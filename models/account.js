var mongoose = require('mongoose');

//passport-local-mongoose
var plm = require('passport-local-mongoose');

//username and password schema
var accountSchema = new mongoose.Schema({
  username: {
       type: String,
       required: 'Username is required'
   },
   password: {
       type: String
   },
    oauthID: {
        type: String
    },
    created: {
        type: Date
    }
});

accountSchema.plugin(plm);

module.exports = mongoose.model('Account', accountSchema);
