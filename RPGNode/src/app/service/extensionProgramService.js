
'use strict';

const { Extension_Program, Tag, User, Campus, Expertise, Publication, Comment } = require('../models');
const Sequelize = require('sequelize');

const Util = require('../service/UtilService')

class ExtensionProgramService{
    
    constructor(){
        this.publication;
    }

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

                        /* ADD / REMOVE CAMPUS */
                        model.removeCampus(obj.campus);
                        model.addCampus(obj.campus);
                        
                        return  model.update(obj).then((editedModel) => { 
                            return editedModel; 
                        });
                    }
                });
            }else{
                obj.createdAt = new Date();
                obj.updatedAt = new Date();
                obj.code = Util.generateCode();
                return Extension_Program.create(obj).then((createdModel) => { 
                    createdModel.addTags(obj.tags);
                    // createdModel.addCampus(obj.campus);
                    return createdModel;
                });
            }
        }catch(err){
            return false;
        }
    }

    get(id){
        return Extension_Program.findOne(
            {
                include: [
                    {
                        model: Tag,
                        as: 'tags',
                        through: { attributes: [] },
                    },
                    {
                        model: Campus,
                        as: 'campus',
                        require: false
                    },
                    {
                        model: Expertise,
                        as: 'expertise',
                        require: false
                    },
                    {
                        model: User,
                        as: 'creator',
                    },
                    {
                        model: User,
                        as: 'members',
                        through: { where: { status: "ACTIVE" }, attributes: [] },
                    },
                    {
                        model: User,
                        as: 'requests',
                        through: { where: { status: "PENDENT" }, attributes: [] },
                    },
                ],
                where: {id: id}
            }
        );
    }

    list(filter, first, size){
        if(!filter) filter = "";

        let whereFilter = { name: { [Sequelize.Op.like]: filter+"%" } };
        
        return Extension_Program.findAll(
            {
                include: [
                    {
                        model: Campus,
                        as: 'campus',
                        require: false
                    },
                    {
                        model: Tag,
                        as: 'tags',
                        through: { attributes: [] },
                    },
                    {
                        model: Expertise,
                        as: 'expertise',
                        require: false
                    },
                    {
                        model: User,
                        as: 'creator',
                        require: false
                    },
                    {
                        model: User,
                        as: 'members',
                        through: { where: { status: "ACTIVE" }, attributes: [] },
                    },
                    {
                        model: User,
                        as: 'requests',
                        through: { where: { status: "PENDENT" }, attributes: [] },
                    },
                ],
                where: whereFilter
            }
        );
    }

    listPublications(extensionId, first, size){
        return Publication.findAll(
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
                where: { extensionId:  extensionId, isPublic: false }
            }
        );
    }

    doMemberRequest(userId, extensionId){ 
        let query = "INSERT IGNORE INTO user_extension_program (`extensionProgramId`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES (:extensionId, :userId, 'PENDENT' , :createdAt, :updatedAt)";
        let date = Util.getDateNow().toString();
        return Publication.sequelize.query(
            query, 
            { replacements: { 
                extensionId: extensionId, 
                userId: userId,
                createdAt: date, 
                updatedAt: date 
            }, type: Sequelize.QueryTypes.INSERT 
        }).then(([results, metadata])=>{
            if(metadata != 0)
                return metadata;
        });
    }

    answerMemberRequest(userId, extensionId, newStatus){ 
        let query = "UPDATE `user_extension_program` SET `status` = :newStatus , `updatedAt` = :updatedAt  WHERE (`extensionProgramId` = :extensionId) and (`userId` = :userId);";
        let date = Util.getDateNow().toString();
        return Publication.sequelize.query(
            query, 
            { replacements: { 
                extensionId: extensionId, 
                userId: userId,
                newStatus: newStatus,
                updatedAt: date 
            }, type: Sequelize.QueryTypes.UPDATE 
        });
    }

}

module.exports = new ExtensionProgramService;