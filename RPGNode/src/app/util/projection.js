class Projection{
    constructor(){
        this.type;
    }

    basic(){
        return this.type = "BASIC";
    }

    full(){
        return this.type = "FULL";
    }

    moderate(){
        return this.type = "moderate";
    }

    get(){
        return this.type;
    }

    set(type){
        this.type = type;
    }
}

module.exports = Projection;