'use strict';

const UtilService = require('../service/utilService')
const UserService = require('../service/userService')
const verifyJWT = require('../../auth/auth');

var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

var utilService = new UtilService();
var userService = new UserService();

/* authentication */
router.post('/auth/login',  (req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  if(!login || !password){
    res.status(401).send({ auth: false, message: "Invalid credentials" });
    return;
  }
  utilService.authenticateUser(login, password).then(user => {
    if(user){
      const id = user.id;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3600 /*  3600 =  1h */
      });
      return res.status(200).send({ auth: true, userId: id, access_token: token });
    }
    return res.status(401).send({ auth: false, message: "Invalid credentials" });
  });
});
 
router.post('/auth/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/auth/getLoggedUser', verifyJWT, function(req, res) {
  try{
    if(req.userId){
      userService.get(req.userId).then((user)=>{
        if(user)
          res.status(200).send(user);
        else
          res.status(404).send({ message: 'User not found' });
        })
      }else{
        res.status(500).send({ message: 'Internal server error' });
    }
  }catch(err){
    res.status(500).send({ message: 'Internal server error' });
  }
 
});

module.exports = router;