'use strict';

const PublicationService = require('../service/publicationService')

const verifyJWT = require('../../auth/auth');

var express = require('express');
var router = express.Router();

var publicationService = new PublicationService();

/* Get one publication */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
      publicationService.get(req.params.id).then( publication => {
        if(publication)
          res.json(publication);
        else{
          res.status(500).send({ error: 'Publication not found' });
        }
      });
    }catch(err){
      res.status(500).send({ error: 'Internal server error' });
    }
})

/* Get all publications */
router.get('/list', verifyJWT, function (req, res) {
  try{
    publicationService.list().then( publications => {
      if(publications)
        res.json(publications);
      else{
        res.status(500).send({ error: 'Publications not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create publication */
router.post('/', verifyJWT, function (req, res) {
  try{
    publicationService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'Updated success' });
      else
        res.status(200).send({ message: 'Created success' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Delete publcation by id */
router.delete('/delete/:id', function (req, res) {
  try{
    publicationService.delete(req.params.id).then( deleted => {
      if(deleted)
        res.status(200).send({ message: 'Deleted publication' });
      else
        res.status(500).send({ error: 'Internal server error' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;