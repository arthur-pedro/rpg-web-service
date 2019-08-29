'use strict';

const { Task } = require('../models');
const TaskService = require('../service/taskService')

var express = require('express');
var router = express.Router();

var  taskService = new TaskService();

/* Get one user */
router.get('/get/:id', function (req, res, next) {
  try{
    taskService.get(req.params.id).then( task => {
      if(task)
        res.json(task);
      else{
        res.status(500).send({ error: 'Task not found' });
      }
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all user */
router.get('/list', function (req, res) {
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
router.post('/', function (req, res) {
  try{
    
    /*  Criar regra de negócio para inserir task */
    
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
router.delete('/delete/:id', function (req, res) {
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