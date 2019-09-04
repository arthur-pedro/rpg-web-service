import { Injectable } from '@angular/core';
import { SERVER_URL, loggedUser } from 'src/config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {
  map
} from "rxjs/operators";
import { delay } from 'q';
import { Router } from '@angular/router';

export interface Tag {
  id: string;
  title: String;
  description: String;
}

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  searchedTags: any = [];

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  
  public insertUpdate(obj){
    return this.http.post(SERVER_URL + "/userProgress/", obj).pipe(map((response)=> response));
  }

  public updateStatus(obj){
    return this.http.post(SERVER_URL + "/util/updateStatus/", obj).pipe(map((response)=> response));
  }

  public listTag(search: string = null): Observable<Tag[]>{
    const params = new HttpParams ().append('filter', search)
    if (search && search.length > 2) {
      return this.http.get(SERVER_URL + "/api/tag/list", { params: params }).pipe(map((response)=> {
        this.searchedTags =  response;
        return  this.searchedTags;
      }, error => {
        console.log(error);
      }));
    }else{
      return of(this.searchedTags).pipe();
    }
  }
  
  public getUserByToken(token){
    return this.http.get(SERVER_URL + "/api/util/auth/getUserByToken", this.auth()).pipe(map((response)=> { return response}));
  }

  public hasLoggedUser(){
    return (localStorage.getItem('jwt') != null) ? true : false;
  }

  public login(obj){
    return this.http.post(SERVER_URL + "/api/util/auth/login", obj).pipe(map((response)=> {return response}));
  }

  public redirectTo(url: String){
    this.router.navigate([url]);
  }

  public auth(){
    return { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken()) };
  }
  
  public getToken(){
    return  JSON.parse(localStorage.getItem('jwt'));
  }
  
  public getAccessToken(){ return JSON.parse(localStorage.getItem('jwt')).access_token; }

  public hasValidToken(){
    return true;
  }

}