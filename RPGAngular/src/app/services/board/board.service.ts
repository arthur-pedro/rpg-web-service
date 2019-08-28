import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  public list(){
    return this.http.get(SERVER_URL + "/publication/list").pipe(map((response)=> response));
  }

  public create(obj){
    return this.http.post(SERVER_URL + "/publication/create", obj).pipe(map((response)=> response));
  }

}
