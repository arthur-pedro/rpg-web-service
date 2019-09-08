
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

    generateCode(){
        var opt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
        return (new Date().getFullYear() + Math.ceil(Math.random() * (999 - 100) + 100) + opt[Math.ceil(Math.random() * (22 - 0) + 0)]);
    }
    
}

module.exports = new UtilService;