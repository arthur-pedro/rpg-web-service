'use strict';

const { News, User, Tag } = require('../models');
const Util = require('./utilService');

class NewsService{

    createUpdate(obj){
        try{
            if(obj.id || obj.id == 0){
                return this.get(obj.id).then((model) => {
                    if(model){
                        obj.updatedAt = new Date();

                        /* ADD / REMOVE TAGS */
                        if(obj.tags){
                            const intArr = []
                            model.tags.forEach(element => {
                                intArr.push(element.id);
                            });
                            model.removeTags(Util.getIdListToRemove(obj.tags, intArr));
                            model.addTags(obj.tags);
                        }
                        delete obj.tags;
                        /* ADD / REMOVE TAGS */
                        
                        return  model.update(obj).then((editedModel) => { 
                            return editedModel; 
                        });
                    }
                });
            }else{
                obj.createdAt = new Date();
                obj.updatedAt = new Date();
                return News.create(obj).then((createdModel) => { 
                    createdModel.addTags(obj.tags);
                    return createdModel;
                });
            }
        }catch(err){
            return false;
        }
    }

    get(id){ 
        return News.findOne(
        {
            include: [
                 {
                    model: Tag,
                    as: 'tags',
                    through: { attributes: [] },
                },
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
                model: Tag,
                as: 'tags',
                through: { attributes: [] },
            },
            {
                model: User,
                as: 'creator',
            }
        ];
        return News.findAll({ include: relationships });
    }

    listPublic(){
        return News.findAll({
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    through: { attributes: [] },
                },
                {
                    model: User,
                    as: 'creator',
                }
            ],
            where: {
                isPublic: true,
                expired: false
            }
        });
    }

    delete(id){
        return News.destroy({where: {id: id}});
    }

}
module.exports = new NewsService;