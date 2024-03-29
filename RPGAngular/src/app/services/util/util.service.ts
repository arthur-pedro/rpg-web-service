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
  id: Number;
  title: String;
  description: String;
}

export interface Campus {
  id: Number;
  name: String;
}

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  searchedTags: any = [];
  searchedCampus: any = [];
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    ) { }

  
  public insertUpdate(obj){
    return this.http.post(SERVER_URL + "/userProgress/", obj).pipe(map((response)=> response));
  }

  public updateStatus(obj){
    return this.http.post(SERVER_URL + "/util/updateStatus/", obj).pipe(map((response)=> response));
  }

  public getLoggedUser(){
    return this.http.get(SERVER_URL + "/api/util/auth/getUserByToken", this.auth()).pipe(map((response)=> { return response}));
  }

  public hasManager(userId, operation){
    return this.http.post(SERVER_URL + "/api/util/auth/hasOperation", {userId: userId, operation: operation}, this.auth()).pipe(map((response)=> { return response}));
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
    if(!localStorage.getItem('jwt'))
      this.redirectTo('/login');
    return  JSON.parse(localStorage.getItem('jwt'));
  }
  
  public getAccessToken(){ 
    if(!localStorage.getItem('jwt'))
      this.redirectTo('/login');
    return JSON.parse(localStorage.getItem('jwt')).access_token; 
  }

  public hasValidToken(){
    return true;
  }

  public listTag(search: string = null): Observable<Tag[]>{
    const params = new HttpParams ().append('filter', search)
    if (search && search.length > 2) {
      return this.http.get(SERVER_URL + "/api/tag/list",  { params: params }).pipe(map((response)=> {
        this.searchedTags =  response;
        return  this.searchedTags;
      }, error => {
        console.log(error);
      }));
    }else{
      return of(this.searchedTags).pipe();
    }
  }

  public listCampus(search: string = null): Observable<Campus[]>{
    const params = new HttpParams ().append('filter', search)
    if (search && search.length > 2) {
      return this.http.get(SERVER_URL + "/api/campus/list",  { params: params }).pipe(map((response: Campus[])=> {
        return  response;
      }, error => {
        console.log(error);
      }));
    }else{
      return of([]).pipe();
    }
  }

  getDateNow(){
    var date = new Date()
    let dateObj:any = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDay(),
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

}