'use strict';

const publicationService = require('../service/publicationService');
const commentService = require('../service/commentService');
const { Projection } = require('../util/projection');
const verifyJWT = require('../../auth/auth');
var express = require('express');
var router = express.Router();


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
router.post('/create', verifyJWT, function (req, res) {
  try{
    publicationService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(200).send({ message: 'Inespered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Create publication */
router.put('/update', verifyJWT, function (req, res) {
  try{
    publicationService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successful' });
      else
        res.status(200).send({ message: 'Publication already exist' }); 
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

/* Add comment */
router.post('/add/comment', verifyJWT, function (req, res) {
  try{
    commentService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(200).send({ message: 'Inespered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Add Like */
router.post('/add/like', verifyJWT, function (req, res) {
  try{
    let publcation = req.body.publication;
    
    let user = req.body.user;
    publicationService.addLike(publcation, user).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull', data: data });
      else
        res.status(200).send({ message: 'already liked' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Get publications by tag [id list] */
router.post('/listByTag', verifyJWT, function (req, res) {
  try{
    let tagList = req.body;
    publicationService.listByTag(tagList).then( publications => {
      if(publications)
        res.json(publications);
      else{
        res.status(404).send({ error: 'Publications not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})


module.exports = router;