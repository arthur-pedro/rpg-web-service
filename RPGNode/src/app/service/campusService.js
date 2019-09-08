
'use strict';

const { Campus } = require('../models');
const Sequelize = require('sequelize');


class CampusService{
    
    constructor(){
        this.publication;
    }

    get(id){
        return Campus.findOne(
            {
                where: {
                    id: id,
                }
            }
        );
    }

    list(filter, first, size){
        if(!filter) filter = "";

        let whereFilter = { name: { [Sequelize.Op.like]: filter+"%" } };
        
        return Campus.findAll(
            {
                where: whereFilter
            }
        );
    }

}

module.exports = new CampusService;