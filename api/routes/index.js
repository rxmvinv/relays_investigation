var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlRelay = require('../controllers/relay');
var ctrlUser = require('../controllers/user');
var ctrlAuth = require('../controllers/authentication');

//Relays
router.get('/relays', ctrlRelay.getRelays);
router.get('/relays/:relay_id', ctrlRelay.getOneRelay);
router.post('/relays', auth, ctrlRelay.createRelay);
router.put('/relays/:relay_id', auth, ctrlRelay.updateRelay); //for admin
router.delete('/relays/:relay_id', auth, ctrlRelay.removeRelay); //for admin

//Users authentication
router.post('/users/register', ctrlAuth.registerUser);
router.post('/users/login', ctrlAuth.loginUser);

//Users
router.get('/users', auth, ctrlUser.getUsers); //for admin
//router.get('/users/:user_id', auth, ctrlUser.getOneUser);
router.post('/users/:user_id', auth, ctrlUser.getOneUser);
router.put('/users/:user_id', auth, ctrlUser.changeUser); //change password email login
router.delete('/users/:user_id', auth, ctrlUser.removeUser);


module.exports = router;
