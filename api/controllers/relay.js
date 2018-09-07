var mongoose = require('mongoose');
var fs = require('fs');
var Relay = mongoose.model('Relay');
var authentication = require('./authentication').authentication;

module.exports.getRelays = (req, res) => {
  //Relay.find({"confirmed": true}, function(err, relays) {
  Relay.find({}, function(err, relays) {
    if (err)
    res.send(err);

    res.json(relays);
  });
}

module.exports.getOneRelay = (req, res) => {
  Relay.findById(req.params.relay_id, function(err, relay) {
    if (err)
    res.send(err);

    res.json(relay);
  });
}

module.exports.createRelay = (req, res) => {
  authentication(req, res, function (req, res, userEmail) {


    if (req.body.thumb) {
      var imgType = req.body.thumb.split(';')[0];
      var imgHeader = imgType.split('/')[1];
      var genHeader = userEmail.replace('@', '_').replace('.', '_') + '-' + req.body.city + req.body.address + '_thumb';
      if (imgHeader == "jpeg") {
        imgHeader = 'images/' + genHeader + '.jpg';
      } else {
        imgHeader = 'images/' + genHeader + '.' + imgHeader;
      }
      var decodedImg = req.body.thumb.split(',')[1];
      var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
        console.log(err);
      });
      var thumb = imgHeader;
      // var thumb = { data: imgHeader };
    }

    if (req.body.flow) {
      var imgType = req.body.flow.split(';')[0];
      var imgHeader = imgType.split('/')[1];
      var genHeader = userEmail.replace('@', '_').replace('.', '_') + '-' + req.body.city + req.body.address + '_flow';
      if (imgHeader == "jpeg") {
        imgHeader = 'images/' + genHeader + '.jpg';
      } else {
        imgHeader = 'images/' + genHeader + '.' + imgHeader;
      }
      var decodedImg = req.body.flow.split(',')[1];
      var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
        console.log(err);
      });
      var flow = imgHeader;
      //var flow = { data: imgHeader };
    }

    if (req.body.map) {
      var imgType = req.body.map.split(';')[0];
      var imgHeader = imgType.split('/')[1];
      var genHeader = userEmail.replace('@', '_').replace('.', '_') + '-' + req.body.city + req.body.address + '_map';
      if (imgHeader == "jpeg") {
        imgHeader = 'images/' + genHeader + '.jpg';
      } else {
        imgHeader = 'images/' + genHeader + '.' + imgHeader;
      }
      var decodedImg = req.body.map.split(',')[1];
      var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
        console.log(err);
      });
      var map = imgHeader;
      // var map = { data: imgHeader };
    }

    if (req.body.mapdetails) {
      var imgType = req.body.mapdetails.split(';')[0];
      var imgHeader = imgType.split('/')[1];
      var genHeader = userEmail.replace('@', '_').replace('.', '_') + '-' + req.body.city + req.body.address + '_mapdetails';
      if (imgHeader == "jpeg") {
        imgHeader = 'images/' + genHeader + '.jpg';
      } else {
        imgHeader = 'images/' + genHeader + '.' + imgHeader;
      }
      var decodedImg = req.body.mapdetails.split(',')[1];
      var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
        console.log(err);
      });
      var mapdetails = imgHeader;
      // var map = { data: imgHeader };
    }

    if (req.body.panorama) {
      var imgType = req.body.panorama.split(';')[0];
      var imgHeader = imgType.split('/')[1];
      var genHeader = userEmail.replace('@', '_').replace('.', '_') + '-' + req.body.city + req.body.address + '_panorama';
      if (imgHeader == "jpeg") {
        imgHeader = 'images/' + genHeader + '.jpg';
      } else {
        imgHeader = 'images/' + genHeader + '.' + imgHeader;
      }
      var decodedImg = req.body.panorama.split(',')[1];
      var data = fs.writeFileSync('build/' + imgHeader, decodedImg, 'base64', function(err) {
        console.log(err);
      });
      var panorama = imgHeader;
      //var panorama = { data: imgHeader };
    }

    var relay = new Relay();
    relay.confirmed = false;
    relay.city = req.body.city;
    relay.address = req.body.address;
    relay.details = req.body.details;
    relay.date = req.body.date;
    relay.useremail = userEmail;
    relay.thumb = thumb;
    relay.flow = flow;
    relay.map = map;
    relay.mapdetails = mapdetails;
    relay.panorama = panorama;

    relay.save(function(err) {
      if (err) {res.send(err);}
      res.json({ message: 'Relay successfully added!' });
    });
  });
}

module.exports.updateRelay = (req, res) => {
  authentication(req, res, function (req, res, userEmail) {
    if (userEmail === 'romainrelaysadmin@gmail.com') {
    Relay.findById(req.params.id, function (error, relay) {
        if (error) { console.error(error); }
        relay.confirmed = false;
        relay.city = req.body.city;
        relay.address = req.body.address;
        relay.details = req.body.details;
        relay.month = req.body.month;
        relay.day = req.body.day;
        relay.year = req.body.year;
        relay.useremail = req.body.useremail;
        relay.thumb = req.body.thumb;
        relay.flow = req.body.flow;
        relay.mapdetails = req.body.mapdetails;
        relay.map = req.body.map;
        relay.panorama = req.body.panorama;
        relay.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.send({
            success: true
          });
        });
      });
    } else { console.error('You don\'t have permission'); }
  });
}

module.exports.removeRelay = (req, res) => {
  authentication(req, res, function (req, res, userEmail) {
    if (userEmail === 'romainrelaysadmin@gmail.com') {
      Relay.remove({ _id: req.params.relay_id }, function(err, relay) {
        if (err)
        res.send(err);
        res.json({ message: 'Relay has been deleted' })
      });
    } else { console.log('You don\'t have permission'); }
  });
}
