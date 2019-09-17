
'use strict';

const { User, Task, Comment, Publication, Extension_Program } = require('../models');

class UserService {

    get(id, projection){
        let include  = [];
        switch(projection){
            case "BASIC":
                break;
            case "MODERATE":
                include.push(
                    {model: Publication, as: "createdPublications"},
                ); 
                break;
            case "FULL":
                include.push(
                    {model: Task, as: "createdTasks"},
                    {model: Comment, as: "comments"},
                    {model: Publication, as: "createdPublications"},
                    {model: Extension_Program, as: "createdExtensions"},
                );
                break;
        }
        return User.findOne(
            {
                include,
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