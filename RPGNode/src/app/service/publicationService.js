
'use strict';

const { Publication, Tag, User } = require('../models');

class PublicationService{
   
    get(id){
        var relationships = [
        {
            model: Tag,
            as: 'tags',
            through: { attributes: [] },
        },
        {
            model: User,
            as: 'creator',
        }
        ];
        return Publication.findOne({ include: relationships }, { where: {id: id} });
    }

    list(){
        var relationships = [
            {
                model: Tag,
                as: 'tags',
                through: { attributes: [] },
            },
            {
                model: User,
                as: 'creator',
            }
        ];
        return Publication.findAll({ include: relationships });
    }

    delete(id){
        return Publication.destroy({where: {id: id}});
    }

    createUpdate(obj){
        return Publication.findOrCreate({where: {id: obj.id}, defaults: obj}).then(([user, created]) => {
            if(created)
              return false;
            else
              return user;
        })
    }
}

module.exports = PublicationService;