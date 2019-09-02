import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  public list(){
    let token = JSON.parse(localStorage.getItem('jwt')).access_token;
    const header = new HttpHeaders().append('x-access-token', token);
    return this.http.get(SERVER_URL + "/api/publication/list", {headers: header}).pipe(map((response)=> response));
  }

  public create(obj: any){
    return this.http.post(SERVER_URL + "/api/publication/create", obj).pipe(map((response)=> response));
  }

  public update(obj: any){
    return this.http.put(SERVER_URL + "/api/publication/update", obj).pipe(map((response)=> response));
  }

  public get(id: Number){
    return this.http.get(SERVER_URL + "/api/publication/get/"+id).pipe(map((response)=> response));
  }

  public delete(id: Number){
    return this.http.delete(SERVER_URL + "/api/publication/delete/"+id).pipe(map((response)=> response));
  }

}
