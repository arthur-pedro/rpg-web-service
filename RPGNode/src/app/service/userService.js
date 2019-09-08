
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

    async getUserByEmail(email){
        return await User.findOne(
            {
                include: [
                    {
                        model: Task,
                        as : 'createdTasks',
                    }
                ],
                where: {
                    email: email,
                }
            }
        );
    }
}

module.exports = new UserService;