'use strict';

const { User } = require('../models');
const View = require('../views/userBusiness')

var express = require('express');
var router = express.Router();
const verifyJWT = require('../../auth/auth');

var business = new View();

/* Get one user */
router.get('/get/:id', verifyJWT, (req, res, next) => {
  try{
    business.get(req.params.id).then( user => {
      if(user)
        res.json(user);
      else{
        res.status(500).send({ error: 'User not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all user */
router.get('/list', verifyJWT, (req, res) => {
  try{
    business.list().then( users => {
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
router.post('/createUpdate', verifyJWT, (req, res) => {
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
    business.delete(req.params.id).then( deleted => {
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