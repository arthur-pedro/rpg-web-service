'use strict';

const UtilService = require('../service/utilService')

var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

var utilService = new UtilService();

/* authentication */
router.post('/login',  (req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  if(!login || !password){
    res.status(401).send({ auth: false, error: "Invalid credentials" });
    return;
  }
  utilService.authenticateUser(login, password).then(user => {
    if(user){
      const id = user.id;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3600 /*  3600 =  1h */
      });
      return res.status(200).send({ auth: true, access_token: token });
    }
    return res.status(401).send({ auth: false, error: "Invalid credentials" });
  });
});
 
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;