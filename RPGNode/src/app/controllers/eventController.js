'use strict';

const  eventService   = require('../service/eventService');
const { Projection } = require('../util/projection');

const verifyJWT = require('../../auth/auth');

var express = require('express');
var router = express.Router();

/* Get one event */
router.get('/get/:id', verifyJWT, function (req, res, next) {
    try{
        eventService.get(req.params.id).then( event => {
            if(event)
                res.json(event);
            else
                res.status(500).send({ error: 'Events not found' });
        });
    }catch(err){
      res.status(500).send({ error: 'Internal server error' });
    }
})

/* Get all event */
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
    eventService.list().then( async (events) => {
      if(events){
        obj.list = events;
        obj.totalRecords = await eventService.count();
        res.json(obj);
      }
      else
        res.status(500).send({ error: 'Events not found' });
      
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all public event */
router.get('/list/public', verifyJWT, function (req, res) {
  try{
    eventService.listPublic().then( events => {
      if(events)
        res.json(events);
      else
        res.status(500).send({ error: 'Events not found' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create event */
router.post('/create', verifyJWT, function (req, res) {
  try{
    eventService.createUpdate(req.body).then( data => {
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
    eventService.createUpdate(req.body).then( data => {
      if(data)
        res.status(200).send({ message: 'successful' });
      else
        res.status(200).send({ message: 'Event already exist' }); 
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Delete event by id */
router.delete('/delete/:id', verifyJWT, function (req, res) {
  try{
    eventService.delete(req.params.id).then( deleted => {
      if(deleted)
        res.status(200).send({ message: 'Event deleted' });
      else
        res.status(500).send({ error: 'Internal server error' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;