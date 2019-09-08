'use strict';

const campusService = require('../service/campusService');
const verifyJWT = require('../../auth/auth');
var express = require('express');
var router = express.Router();

/* Get one campus */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
        campusService.get(req.params.id).then( campus => {
        if(campus)
          res.json(campus);
        else{
          res.status(500).send({ error: 'Campus not found' });
        }
      });
    }catch(err){
      res.status(500).send({ error: 'Internal server error' });
    }
})

/* Get all campus */
router.get('/list', function (req, res) {
  let filter = req.query.filter;
  let first = null;
  let size = null;
  try{
    campusService.list(filter, first, size).then( campus => {
      if(campus)
        res.json(campus);
      else{
        res.status(500).send({ error: 'Campus not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});


module.exports = router;