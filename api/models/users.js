var mongoose = require("mongoose");
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String,
  salt: String,
  image: {
    data: String
  }
});

UsersSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UsersSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJwt = function() {
  var expiry = new Date();
  //expiry.setDate(expiry.getDate() + 7);
  expiry.setMinutes(expiry.getMinutes() + 21);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    login: this.login,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);//heroku config:set JWT_SECRET=thisIsSecret
};

UsersSchema.methods.verifyJwt = function(token) {
  return jwt.verify(token, process.env.JWT_SECRET, function (err, valid) {
    if (err) throw err;

    return valid;
  })
};

var User = mongoose.model("User", UsersSchema);
module.exports = User;
