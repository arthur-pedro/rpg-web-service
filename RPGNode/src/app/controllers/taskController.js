'use strict';

const { Task } = require('../models');
var express = require('express');
var router = express.Router();

/* Get one user */
router.get('/getById/:id', function (req, res, next) {
  try{
    Task.findOne({ where: {id: req.params.id} }).then(user => {
      if(user)
        res.json(user)
      else
        res.status(500).send({ error: 'Task not found' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all user */
router.get('/list/all', function (req, res) {
  try{
    Task.findAll().then(listUser => {
      if(listUser)
        res.json(listUser)
      else
        res.status(500).send({ error: 'Task not found' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create user */
router.post('/createUpdate', function (req, res) {
  try{
    
    /*  Criar regra de negócio para inserir usuário */
    
    Task.findOrCreate({where: {id: req.body.id}, defaults: req.body}).then(([user, created]) => {
      if(created)
        res.status(200).send({ success: 'Create successfull' });
      else
        res.status(200).send(user.get({ plain: true  }));
    })
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Delete user by id */
router.delete('/deleteById/:id', function (req, res) {
  try{
    Task.destroy({where: {id: req.params.id}}).then(deleted => {
      if(deleted)
        res.status(200).send({ success: 'Usuário deletado' });
      else{
        res.status(500).send({ error: 'Internal server error' });
      }
    }); 
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;