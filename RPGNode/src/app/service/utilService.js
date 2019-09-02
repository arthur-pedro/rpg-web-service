
'use strict';

const { User } = require('../models');
const Sequelize = require('sequelize');

class UtilService {
    

    authenticateUser(login, password){
        return User.findOne({ 
            where: {
                password: password, 
                [Sequelize.Op.or]: [{email: login}, {code: login}]
            }
        });
    }

    /* 1º param: NEW ID LIST
       2º param: CURRENT ID LIST
    */
    getIdListToRemove(newArray, currentArray){
        let diff = currentArray.filter(x => !newArray.includes(x)).concat(currentArray.filter(x => !newArray.includes(x)));
        return diff.filter(function(este, i) { return diff.indexOf(este) === i; });
    }

    
}

module.exports = UtilService;