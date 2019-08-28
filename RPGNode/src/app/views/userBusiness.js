
'use strict';

const { User } = require('../models');

class UserBusiness {
   
    get(id){
        return User.findOne({ where: {id: id} });
    }

    list(){
        return User.findAll();
    }

    delete(id){
        return User.destroy({where: {id: id}});
    }

    createUpdate(){

    }
}

module.exports = UserBusiness;