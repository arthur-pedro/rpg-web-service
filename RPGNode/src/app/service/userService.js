
'use strict';

const { User, Task } = require('../models');

class UserService {
   
    get(id){
        return User.findOne(
            {
                include: [
                    {
                        model: Task,
                        as : 'createdTasks',
                    }
                ],
                where: {
                    id: id,
                }
            }
        );
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

module.exports = new UserService;