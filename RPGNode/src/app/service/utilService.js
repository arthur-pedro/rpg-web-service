
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

    
}

module.exports = UtilService;