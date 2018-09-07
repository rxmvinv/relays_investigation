//server.js
'use strict'

//first we import our dependencies…
require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var passport = require('passport');
var db = require('./api/models/db');
var passportConf = require('./api/config/passport');
var routesApi = require('./api/routes/index');
//and create our instances
var app = express();
app.use(morgan('combined'))

//set our port to either a predetermined port number if you have set
//it up, or 3001
//var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

//and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(cors());
app.use(passport.initialize());
app.use(express.static('build'))
app.use('/images', express.static('build/images'))
//Use our router configuration when we call /api
app.use('/api', routesApi);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

//starts the server and listens for requests
/*
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
*/
app.listen(process.env.PORT || 3001);
