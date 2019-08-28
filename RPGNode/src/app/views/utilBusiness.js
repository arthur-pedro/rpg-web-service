
'use strict';

const { User } = require('../models');

class UtilBsiness {
   
    authenticateUser(login, password){
        return User.findOne({ where: {id: login} });
    }

    
}

module.exports = UtilBsiness;