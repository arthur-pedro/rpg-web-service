'use strict';

const extensionProgramService = require('../service/extensionProgramService');
const verifyJWT = require('../../auth/auth');
var express = require('express');
var router = express.Router();


/* Create extension */
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


/* Get one extension */
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

/* Get all extensions */
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

/* Get publications by extensionId */
router.get('/list/publications', verifyJWT, function (req, res) {
  try{
    let extensionId = req.query.extensionId;
    extensionProgramService.listPublications(extensionId).then( publications => {
      if(publications)
        res.json(publications);
      else{
        res.status(404).send({ error: 'Publications not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* answer a member request */
router.post('/answerMemberRequest', verifyJWT, function (req, res) {
  try{
    extensionProgramService.answerMemberRequest(req.query.userId, req.query.extensionId, req.query.status).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(200).send({ message: 'Inespered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* do a member request */
router.post('/doMemberRequest', verifyJWT, function (req, res) {
  try{
    extensionProgramService.doMemberRequest(req.query.userId, req.query.extensionId).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(304).send({ message: 'Not Modified' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;