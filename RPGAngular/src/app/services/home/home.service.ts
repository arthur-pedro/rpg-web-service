import { SERVER_URL } from './../../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http: HttpClient,) { }
  
  public getUser(userId){
    return this.http.get(SERVER_URL + "/user/getBasic/" + userId).pipe(map((response)=> response));
  }

  public getFullUser(userId){
    return this.http.get(SERVER_URL + "/user/" + userId).pipe(map((response)=> response));
  }

  public listPublicNews(){
    return this.http.get(SERVER_URL + "/news/list/public").pipe(map((response)=> response));
  }

  public listPublicEvent(){
    return this.http.get(SERVER_URL + "/event/list/public").pipe(map((response)=> response));
  }

  public getPod(range){
    return this.http.get(SERVER_URL + "/ranking/getPod/" + range).pipe(map((response)=> response));
  }
}
