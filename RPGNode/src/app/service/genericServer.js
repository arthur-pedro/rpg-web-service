
'use strict';

class GenericService {

    get(id){
        return Task.findOne({ where: {id: id} });
    }

    list(){
        return Task.findAll();
    }

    delete(id){
        return Task.destroy({where: {id: id}});
    }

    createUpdate(obj){

    }
}

module.exports = GenericService;