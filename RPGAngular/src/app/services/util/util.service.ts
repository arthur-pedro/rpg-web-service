import { Injectable } from '@angular/core';
import { SERVER_URL, loggedUser } from 'src/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {
  map
} from "rxjs/operators";
import { delay } from 'q';

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

  constructor(private http: HttpClient) { }

  
  public insertUpdate(obj){
    return this.http.post(SERVER_URL + "/userProgress/", obj).pipe(map((response)=> response));
  }

  public updateStatus(obj){
    return this.http.post(SERVER_URL + "/util/updateStatus/", obj).pipe(map((response)=> response));
  }

  public listTag(search: string = null): Observable<Tag[]>{
    const params = new HttpParams ().append('filter', search)
    if (search && search.length > 2) {
      return this.http.get(SERVER_URL + "/tag/list", { params: params }).pipe(map((response)=> {
        this.searchedTags =  response;
        return  this.searchedTags;
      }, error => {
        console.log(error);
      }));
    }else{
      return of(this.searchedTags).pipe();
    }
  }
  
  public getLoggedUser(){
    return loggedUser;
  }
}