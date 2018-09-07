var mongoose = require('mongoose');
var Relay = require("./relays");
var User = require("./users");

//mongoose.connect('mongodb://localhost:27017/relaysflow');//, {useMongoClient: true});
mongoose.connect('mongodb://rxmvin:romaindevpass1@ds141450.mlab.com:41450/relaysflow');

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});
