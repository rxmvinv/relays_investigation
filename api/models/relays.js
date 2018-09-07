var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RelaysSchema = new Schema({
  confirmed: {
    type: Boolean,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  useremail: {
    type: String,
    required: true
  },
  thumb: {
    //path: String,
    type: String
  },
  flow: {
    //path: String,
    type: String
  },
  map: {
    //path: String,
    type: String
  },
  mapdetails: {
    //path: String,
    type: String
  },
  panorama: {
    //path: String,
    type: String
  }
});

var Relay = mongoose.model("Relay", RelaysSchema);
module.exports = Relay;
