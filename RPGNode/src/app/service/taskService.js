
'use strict';

const { Task, User } = require('../models');

class TaskService{
   
    get(id){
        var relationships = [
            {
                model: User,
                as : 'creator',
            },
        ];
        return Task.findOne({ include: relationships }, { where: {id: id} });
    }

    list(){
        return Task.findAll();
    }

    delete(id){
        return Task.destroy({where: {id: id}});
    }

    createUpdate(){

    }
}

module.exports = TaskService;