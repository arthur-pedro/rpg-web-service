
'use strict';

const { User, Task, Comment, Publication, Extension_Program, sequelize } = require('../models');

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

    getInfo(userId){
        let query = '' +
        ' SELECT COUNT(creatorId) as publications,  FROM publication where creatorId = :userId UNION ' +
        ' SELECT COUNT(creatorId) as comments FROM comment where creatorId = :userId UNION ' +
        ' SELECT COUNT(userId) as likes FROM publication_like_user where userId = :userId UNION ' +
        ' SELECT COUNT(userId) as receivedLikes FROM publication_like_user WHERE publicationId in (SELECT id  FROM publication WHERE creatorId = :userId) ';
        return sequelize.query(query,
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT }).then(res => {
            return res;
        });
    }
}

module.exports = new UserService;