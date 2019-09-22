'use strict';

const  newsService   = require('../service/newsService');
const { Projection } = require('../util/projection');

const verifyJWT = require('../../auth/auth');

var express = require('express');
var router = express.Router();

/* Get one news */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
      newsService.get(req.params.id).then( news => {
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
  
  /* PAGINATION */
  let first = 0;
  let maxResults = 0;
  if(req.query.first && req.query.maxResults){
    first = parseInt(req.query.first, 10);
    maxResults = parseInt(req.query.maxResults, 10);
  }

  /* PAGINATION OBJ */
  const obj = {
    list: [],
    totalRecords: 0,
  }

  try{
    newsService.list(first, maxResults).then( async (news) => {
      if(news){
        obj.list = news;
        obj.totalRecords = await newsService.count();
        res.json(obj);
      } else{
        res.status(500).send({ error: 'News not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all public news */
router.get('/list/public', verifyJWT, function (req, res) {
  try{
    newsService.listPublic().then( news => {
      if(news)
        res.json(news);
      else{
        res.status(404).send({ error: 'News not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create news */
router.post('/create', verifyJWT, function (req, res) {
  try{
    newsService.createUpdate(req.body).then( data => {
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
    newsService.createUpdate(req.body).then( data => {
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
router.delete('/delete/:id', verifyJWT, function (req, res) {
  try{
    newsService.delete(req.params.id).then( deleted => {
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