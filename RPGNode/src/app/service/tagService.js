
'use strict';

const { Publication, Tag, User } = require('../models');
const UtilService = require('./utilService');
const Sequelize = require('sequelize');

var Util = new UtilService();

class TagService{
    
    constructor(){
        this.publication;
    }

    get(id){
        return Tag.findOne(
            {
                include: [
                    {
                        model: Publication,
                        as: 'publications',
                        through: { attributes: [] },
                    },
                ],
                where: {
                    id: id,
                }
            }
        );
    }

    list(filter, first, size){
        if(!filter) filter = "";

        let whereFilter = { title: { [Sequelize.Op.like]: filter+"%" } };
        
        return Tag.findAll(
            {
                include: [
                    {
                        model: Publication,
                        as: 'publications',
                        through: { attributes: [] },
                    },
                ],
                where: whereFilter
            }
        );
    }

    delete(id){
        return Tag.destroy({where: {id: id}});
    }

    // createUpdate(obj){
    //     try{
    //         if(obj.id || obj.id == 0){
    //             return this.get(obj.id).then((model) => {
    //                 if(model){
    //                     obj.updatedAt = new Date();

    //                     /* ADD / REMOVE TAGS */
    //                     if(obj.tags){
    //                         const intArr = []
    //                         model.tags.forEach(element => {
    //                             intArr.push(element.id);
    //                         });
    //                         model.removeTags(Util.getIdListToRemove(obj.tags, intArr));
    //                         model.addTags(obj.tags);
    //                     }
    //                     delete obj.tags;
    //                     /* ADD / REMOVE TAGS */
                        
    //                     return  model.update(obj).then((editedModel) => { 
    //                         return editedModel; 
    //                     });
    //                 }
    //             });
    //         }else{
    //             obj.createdAt = new Date();
    //             obj.updatedAt = new Date();
    //             return Publication.create(obj).then((createdModel) => { 
    //                 createdModel.addTags(obj.tags);
    //                 return createdModel;
    //             });
    //         }
    //     }catch(err){
    //         return false;
    //     }
    // }

}

module.exports = TagService;