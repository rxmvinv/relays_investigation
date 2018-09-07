var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');

module.exports.authentication = function(req, res, callback) {
  if (req.payload && req.payload.email) {
    User
    .findOne({ email : req.payload.email })
    .exec(function(err, user) {
      if (!user) {
        res.status(404);
        res.json({
          "message": "User not found"
        });
        return;
      } else if (err) {
        res.status(404);
        res.send(err);
        return;
      }
      callback(req, res, user.email);
    });
  } else {
    res.status(404);
    res.json({
      "message": "User not found"
    });
    return;
  }
};

module.exports.registerUser = function(req, res) {
  if(!req.body.login || !req.body.email || !req.body.password) {
    res.status(400);
    res.json({message: "All fields required"});
    return;
  }

  if (req.body.image) {
    var imgType = req.body.image.split(';')[0];
    var imgHeader = imgType.split('/')[1];
    var genHeader = req.body.login + '_thumb';

    if (imgHeader == "jpeg") {
      imgHeader = 'images/' + genHeader + '.jpg';
    } else {
      imgHeader = 'images/' + genHeader + '.' + imgHeader;
    }

    //console.log(imgHeader);

    var decodedImg = req.body.image.split(',')[1];

    var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
      console.log(err);
    });

    //var imgData = fs.readFileSync(imgHeader);

    var image = {
      data: imgHeader//imgData,
      //contentType: imgType
    };
  }

  var user = new User();

  //user.id = uuid.v4()
  user.login = req.body.login;
  user.email = req.body.email;
  user.image = image;

  user.setPassword(req.body.password);
  user.save(function(err) {
    var token;
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token : token
      });
    }
  });
};

module.exports.loginUser = function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.status(400);
    res.json({message: "All fields required"});
    return;
  }
  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      res.status(404);
      res.send(err);
      return;
    }
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        token : token
      });
    } else {
      res.status(401);
      res.send(info);
    }
  })(req, res);
};
