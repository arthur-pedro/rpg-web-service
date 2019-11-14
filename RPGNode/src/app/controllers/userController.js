'use strict';

const { User } = require('../models');
const Projection = require("../util/projection");
const userService = require('../service/userService')

const verifyJWT = require('../../auth/auth');

var express = require('express');
var router = express.Router();


/* Get one user */
router.get('/get/:id', verifyJWT, (req, res, next) => {
  try{
    userService.get(req.params.id, Projection.FULL).then( user => {
      if(user){
        res.json(user);
      }else{
        res.status(500).send({ error: 'User not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})


/* Get one user */
router.get('/getByEmail/:email', verifyJWT, (req, res, next) => {
  try{
    userService.getUserByEmail(req.params.email).then( user => {
      if(user){
        res.json(user);
      }else{
        res.status(500).send({ error: 'User not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Get one user */
router.get('/getInfo/:id', verifyJWT, (req, res, next) => {
  try{
    userService.getInfo(req.params.id).then( user => {
      if(user){
        res.json(user);
      }else{
        res.status(500).send({ error: 'User not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
});

/* Get all user */
router.get('/list', verifyJWT, (req, res) => {
  try{
    userService.list().then( users => {
      if(users)
        res.json(users)
      else
        res.status(500).send({ error: 'Users not found' });
    })
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create user */
router.post('/', verifyJWT, (req, res) => {
  try{
    
    /*  Criar regra de negócio para inserir usuário */
    
    User.findOrCreate({where: {id: req.body.id}, defaults: req.body}).then(([user, created]) => {
      if(created)
        res.status(200).send({ message: 'Created user' });
      else
        res.status(200).send(user.get({ plain: true  }));
    })
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Delete user by id */
router.delete('/delete/:id', verifyJWT, (req, res) => {
  try{
    userService.delete(req.params.id).then( deleted => {
      if(deleted)
        res.status(200).send({ message: 'Deleted user' });
      else
        res.status(500).send({ error: 'Internal server error' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;