
'use strict';

const { User, Task } = require('../models');

class UserService {
   
    get(id){
        var relationships = [
            {
                model: Task,
                as : 'createdTasks',
            },
        ];
        return User.findOne({ include: relationships },{ where: {id: id} });
    }

    list(){
        return User.findAll();
    }

    delete(id){
        return User.destroy({where: {id: id}});
    }

    createUpdate(){

    }
}

module.exports = UserService;