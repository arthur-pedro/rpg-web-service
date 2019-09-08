'use strict';

const { Event, User, Tag } = require('../models');
const Util = require('./utilService');

class EventService{

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
                obj.code = Util.generateCode();
                obj.isPublic = true;
                return Event.create(obj).then((createdModel) => { 
                    createdModel.addTags(obj.tags);
                    return createdModel;
                });
            }
        }catch(err){
            return false;
        }
    }

    get(id){ 
        return Event.findOne(
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
        return Event.findAll({
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
        },);
    }

    listPublic(){
        return Event.findAll({
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
        return Event.destroy({where: {id: id}});
    }

    async count(){
        return await Event.sequelize.query('SELECT COUNT(id) as count FROM event;', {
          model: Event,
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
module.exports = new EventService;