'use strict';

const { News, User, Tag } = require('../models');
const Util = require('./utilService');

const Sequelize = require('sequelize');

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

    list(first, maxResults){
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
            offset: first,
            limit: maxResults
        },
        );
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

    async count(){
        return await News.sequelize.query('SELECT COUNT(id) as count FROM news;', {
          model: News,
          mapToModel: false 
        })
        .then(res => {
            if(res && res[0] && res[0].dataValues && res[0].dataValues.count > 0)
                return res[0].dataValues.count;
            else
                return 0;
        })
    }

}
module.exports = new NewsService;