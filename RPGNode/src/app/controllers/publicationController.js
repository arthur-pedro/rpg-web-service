'use strict';

const { Publication, Tag } = require('../models');
var express = require('express');
var router = express.Router();

/* Get one publication */
router.get('/get/:id', function (req, res, next) {
  try{
    var relationships = [
        {
            model: Tag,
            as: 'tags',
            through: { attributes: [] },
        },
    ];
    Publication.findOne({ where: {id: req.params.id} }, {include: relationships}).then(publication => {
      if(publication)
        res.json(publication)
      else
        res.status(500).send({ error: 'Publication not found' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Get all user */
router.get('/list', function (req, res) {
  try{
    var relationships = [
        {
            model: Tag,
            as: 'tags',
            through: { attributes: [] },
        },
    ];
    Publication.findAll({ include: relationships }).then(publications => {
      if(publications)
        res.json(publications)
      else
        res.status(500).send({ error: 'Publications not found' });
    });
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

/* Create user */
router.post('/createUpdate', function (req, res) {
  try{
    
    /*  Criar regra de negócio para inserir usuário */
    
    Publication.findOrCreate({where: {id: req.body.id}, defaults: req.body}).then(([user, created]) => {
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
    Publication.destroy({where: {id: req.params.id}}).then(deleted => {
      if(deleted)
        res.status(200).send({ success: 'Publication deleted' });
      else{
        res.status(500).send({ error: 'Internal server error' });
      }
    }); 
  }catch(err){
    res.status(500).send({ error: 'Internal server error' });
  }
})

module.exports = router;