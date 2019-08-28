'use strict';


const View = require('../views/utilBusiness')

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var business = new View();

/* authentication */
router.post('/login',  (req, res) => {
  let login = req.params.login;
  let password = req.params.password;
  if(!login || !password){
    res.status(401).send({ auth: false, error: "Invalid credentials" });
    return;
  }
  business.authenticateUser(login, password).then(([logged, user]) => {
    if(logged){
      const id = user.id;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3000 /*  300 =  5min */
      });
      res.status(200).send({ auth: true, access_token: token });
    }
    res.status(401).send({ auth: false, error: "Invalid credentials" });
  });
});
 
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;