
'use strict';

const { Publication, Tag, User, Comment } = require('../models');
const Util = require('./utilService');

const Sequelize = require('sequelize');

class PublicationService{
    
    constructor(){
        this.publication;
    }

    get(id){
        return Publication.findOne(
            {
                include: [
                    {
                        model: Tag,
                        as: 'tags',
                        through: { attributes: [] },
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: { model: User, as: 'creator' },
                        require: false
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
                model: Comment,
                as: 'comments',
                attributes: ['id'],
                require: false
            },
            {
                model: User,
                as: 'creator',
            }
        ];
        return Publication.findAll({ include: relationships });
    }

    listByTag(idList){    

        let query = " SELECT publicationId AS id FROM publication_tag WHERE tagId IN(:idList) ";

        return Publication.sequelize.query(query, 
            { replacements: { idList: idList }, type: Sequelize.QueryTypes.SELECT }
        ).then(res => {
            if(res){
                let publicationIds = [];
                res.forEach(element =>{
                    publicationIds.push(element.id);
                });
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
                return Publication.findAll({ include: relationships, where: { id: { [Sequelize.Op.in] : publicationIds} } });
            }else
                return [];
        });
    }

    delete(id){
        return Publication.destroy({where: {id: id}});
    }

    createUpdate(obj){
        try{
            if(obj.id || obj.id != 0){
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
                return Publication.create(obj).then((createdModel) => { 
                    createdModel.addTags(obj.tags);
                    return createdModel;
                });
            }
        }catch(err){
            return false;
        }
    }

    addLike(publication, user){ 
        let query = "INSERT IGNORE INTO publication_like_user (`publicationId`, `userId`, `createdAt`, `updatedAt`) VALUES (:pubId, :userId, :createdAt, :updatedAt)";
        let date = Util.getDateNow().toString();
        return Publication.sequelize.query(
            query, 
            { replacements: { 
                userId: user.id, 
                pubId: publication.id,
                createdAt: date, 
                updatedAt: date 
            }, type: Sequelize.QueryTypes.INSERT 
        }).then((res)=>{
            if(res[1]){
                publication.likes++;
                return Publication.sequelize.query("UPDATE publication SET `likes` = :likes WHERE `id` = :id", 
                { replacements: { 
                    id: publication.id, 
                    likes: publication.likes,
                }, type: Sequelize.QueryTypes.UPDATE 
                }).then(([results, metadata]) => {
                    return metadata;
                });
            }
        });
    }
}

module.exports = new PublicationService;