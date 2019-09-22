
'use strict';

const { User, sequelize } = require('../models');
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

    getDateNow(){
        var date = new Date()
        let dateObj = {
            year: date.getFullYear(),
            month: (date.getMonth() + 1),
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        if(dateObj.month < 10) 
            dateObj.month = "0" + (date.getMonth() + 1);
        if(dateObj.day < 10) 
            dateObj.day = "0" + dateObj.day
        if(dateObj.hour < 10) 
            dateObj.hour = "0" + dateObj.hour
        if(dateObj.minute < 10) 
            dateObj.minute = "0" + dateObj.minute
        if(dateObj.second < 10) 
            dateObj.second = "0" + dateObj.second
        return dateObj.year + "-" + dateObj.month + "-" + dateObj.day + " " + dateObj.hour + ":" + dateObj.minute + ":" + dateObj.second; 
    }

    hasOperation(userId, operation){
        let query = 'SELECT * FROM user_operation WHERE userId = :userId AND operationId = (SELECT id FROM operation WHERE name = :operation)';
        return sequelize.query(query,
        { replacements: { userId: userId, operation:operation }, type: Sequelize.QueryTypes.SELECT }).then(res => {
            return (res && res.length > 0) ;
        })
    }
}

module.exports = new UtilService;