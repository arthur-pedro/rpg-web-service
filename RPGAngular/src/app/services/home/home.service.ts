import { SERVER_URL } from './../../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http: HttpClient, private util: UtilService) { }
  
  public getUser(userId){
    return this.http.get(SERVER_URL + "/api/user/get/" + userId, this.util.auth()).pipe(map((response)=> response));
  }

  public getFullUser(userId){
    return this.http.get(SERVER_URL + "/api/user/get/" + userId, this.util.auth()).pipe(map((response)=> response));
  }

  public listPublicNews(){
    return this.http.get(SERVER_URL + "/news/list/public", this.util.auth()).pipe(map((response)=> response));
  }

  public listPublicEvent(){
    return this.http.get(SERVER_URL + "/event/list/public", this.util.auth()).pipe(map((response)=> response));
  }

  public getPod(range){
    return this.http.get(SERVER_URL + "/ranking/getPod/" + range, this.util.auth()).pipe(map((response)=> response));
  }
}
