'use strict';

const extensionProgramService = require('../service/extensionProgramService');
const verifyJWT = require('../../auth/auth');
var express = require('express');
var router = express.Router();


/* @Create campus*/
router.post('/create', verifyJWT, function (req, res) {
  try{
    extensionProgramService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(200).send({ message: 'Inespered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});


/* Get one campus */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
        extensionProgramService.get(req.params.id).then( extension => {
        if(extension)
          res.json(extension);
        else{
          res.status(500).send({ error: 'Extension not found' });
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
    extensionProgramService.list(filter, first, size).then( extensions => {
      if(extensions)
        res.json(extensions);
      else{
        res.status(500).send({ error: 'Extensions not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});


module.exports = router;