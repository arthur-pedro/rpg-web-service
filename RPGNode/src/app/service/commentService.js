
'use strict';

const { Publication, Tag, User, Comment } = require('../models');
const Util = require('./utilService');


class CommentService{
    
    constructor(){
        this.comment;
    }

    get(id){
        return Comment.findOne(
            {
                include: [
                    {
                        model: User,
                        as: 'creator',
                    }
                ],
                where: {
                    id: id,
                }
            }
        );
    }

    list(){
        var relationships = [
            {
                model: User,
                as: 'creator',
            }
        ];
        return Comment.findAll({ include: relationships });
    }

    delete(id){
        return Comment.destroy({where: {id: id}});
    }

    createUpdate(obj){
        try{
            if(obj.id || obj.id == 0){
                return this.get(obj.id).then((model) => {
                    if(model){
                        obj.updatedAt = new Date();
                        return  model.update(obj).then((editedModel) => { 
                            return editedModel; 
                        });
                    }
                });
            }else{
                obj.createdAt = new Date();
                obj.updatedAt = new Date();
                return Comment.create(obj).then((createdModel) => { 
                    return createdModel;
                });
            }
        }catch(err){
            return false;
        }
    }
}

module.exports = new CommentService;