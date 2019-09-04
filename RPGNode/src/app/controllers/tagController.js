'use strict';

const TagService = require('../service/tagService');
const { Projection } = require('../util/projection');
const verifyJWT = require('../../auth/auth');
var express = require('express');
var router = express.Router();

var tagService = new TagService();

/* Get one tag */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
        tagService.get(req.params.id).then( tag => {
        if(tag)
          res.json(tag);
        else{
          res.status(500).send({ error: 'Tag not found' });
        }
      });
    }catch(err){
      res.status(500).send({ error: 'Internal server error' });
    }
})

/* Get all publications */
router.get('/list', verifyJWT, function (req, res) {
let filter = req.query.filter;
let first = null;
let size = null;
  try{
    tagService.list(filter, first, size).then( tags => {
      if(tags)
        res.json(tags);
      else{
        res.status(500).send({ error: 'Tags not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create publication */
router.post('/create', verifyJWT, function (req, res) {
  try{
    tagService.createUpdate(req.body).then( data => {
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
    tagService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successful' });
      else
        res.status(200).send({ message: 'Inspered error' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Delete publcation by id */
router.delete('/delete/:id', function (req, res) {
  try{
    tagService.delete(req.params.id).then( deleted => {
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