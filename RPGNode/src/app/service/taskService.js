
'use strict';

const { Task, User } = require('../models');

class TaskService{
   
    get(id){
        return Task.findOne(
            {
                include: [
                    {
                        model: User,
                        as : 'creator',
                    },
                ],
                where: {
                    id: id,
                }
            }
        );
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