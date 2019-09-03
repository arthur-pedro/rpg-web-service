'use strict';

const { NewsService } = require('../service');
const { Projection } = require('../util/projection');

const verifyJWT = require('../../auth/auth');

var express = require('express');
var router = express.Router();

/* Get one news */
router.get('/get/:id', function (req, res, next) {
    try{
      NewsService.get(req.params.id).then( news => {
        if(news)
          res.json(news);
        else{
          res.status(500).send({ error: 'News not found' });
        }
      });
    }catch(err){
      res.status(500).send({ error: 'Internal server error' });
    }
})

/* Get all news */
router.get('/list', verifyJWT, function (req, res) {
  try{
    NewsService.list().then( news => {
      if(news)
        res.json(news);
      else{
        res.status(500).send({ error: 'News not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create news */
router.post('/create', verifyJWT, function (req, res) {
  try{
    NewsService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successfull' });
      else
        res.status(200).send({ message: 'Inespered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Create news */
router.put('/update', verifyJWT, function (req, res) {
  try{
    NewsService.createUpdate(req.body).then( data => {
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
    NewsService.delete(req.params.id).then( deleted => {
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