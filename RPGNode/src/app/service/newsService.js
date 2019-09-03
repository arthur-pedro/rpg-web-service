'use strict';

const { News, User } = require('../models');

class NewsService {
    get(id){ 
        console.log(id)
        // return News.findOne(
        // {
        //     include: [
        //          {
        //             model: Tag,
        //             as: 'tags',
        //             through: { attributes: [] },
        //         },
        //         {
        //             model: User,
        //             as: 'creator',
        //         }
        //     ],
        //     where: {
        //          id: id,
        //         }
        //     }
        // );
    }

}

module.exports = new NewsService();