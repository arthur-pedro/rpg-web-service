export class Jwt{
    
    private access_token: String;
    
    private auth: boolean;
    
    private token: any;
    
    private userId: Number;

    constructor(value){
        this.token = value;
    }

    generate(){
        this.auth = this.token.auth;
        this.userId = this.token.userId;
        this.access_token = this.token.access_token;
        return { auth: this.auth, userId: this.userId, access_token: this.access_token }
    }

    getToken(){
        return this.access_token;
    }

    isAuth(){
        return this.auth;
    }

    getUserId(){
        return this.userId;
    }
}