var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jsonwebtoken'); ////////
var User = mongoose.model('User');
var authentication = require('./authentication').authentication;

module.exports.getUsers = (req, res) => {
  authentication(req, res, function (req, res, userName) {
    if (userName === 'romainrelaysadmin@gmail.com') {
      User.find(function(err, users) {
        if (err) { res.send(err); }
        res.json(users)
      });
    } else { console.error('You don\'t have permission'); }
  });
};

/*
module.exports.getOneUser = (req, res) => {
  authentication(req, res, function (req, res, userName) {
    if (req.params.user_id) {
      User.findById(req.params.user_id, '_id login email image', function(err, user) {
        if (err) { res.send(err); }
        console.log(user);
        res.json(user);
      });
    }
  });
};*/

module.exports.getOneUser = function(req, res) {
  authentication(req, res, function (req, res, userName) {
    User
    .findById(req.params.user_id, '_id login email image', function(err, user) {
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

      var validUser = user.verifyJwt(req.body.token);

      if (validUser) {
        var token = user.generateJwt();
        res.json({
            user: user,
            token: token
        });
      }


      /*
      var validUser = user.verifyJwt(req.body.token);

      if (validUser === 'TokenExpiredError') {
        var token = user.generateJwt();
        res.json({
            user: user,
            token: token
        });
      } else {
        res.json({
            user: user,
            valid: validUser
        });
      }
      */
    })
  });
};

module.exports.changeUser = (req, res) => {
  authentication(req, res, function (req, res, userName) {
    User.findById(req.params.user_id, function (error, user) {
      if (error) { console.error(error); }

      if (req.body.login) {
        user.login = req.body.login;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }

      if (req.body.password) {
        user.setPassword(req.body.password);
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

        var decodedImg = req.body.image.split(',')[1];

        var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
          console.log(err);
        });

        //var imgData = fs.readFileSync(imgHeader);

        var image = {
          data: imgHeader//imgData,
          //contentType: imgType
        };

        user.image = image;
      }

      user.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        });
      });
    });
  });
};

module.exports.removeUser = (req, res) => {
  authentication(req, res, function (req, res, userName) {
    User.remove({_id : req.params._id}, function(err, user) {
      if (err) { return res.send(err); }
      res.send({ success: true });
    });
  });
};
