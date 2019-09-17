
'use strict';

const { Extension_Program, Tag, User, Campus, Expertise } = require('../models');
const Sequelize = require('sequelize');

const util = require('../service/utilService')

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
                obj.code = util.generateCode();
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
                    }
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
                        model: Tag,
                        as: 'tags',
                        through: { attributes: [] },
                    },
                    {
                        model: User,
                        as: 'creator',
                    }
                ],
                where: whereFilter
            }
        );
    }

}

module.exports = new ExtensionProgramService;