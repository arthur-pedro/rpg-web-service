import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient, private util: UtilService) { }

  public list(){
    return this.http.get(SERVER_URL + "/api/publication/list", this.util.auth()).pipe(map((response)=> response));
  }

  public create(obj: any){
    return this.http.post(SERVER_URL + "/api/publication/create", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public update(obj: any){
    return this.http.put(SERVER_URL + "/api/publication/update", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public get(id: Number){
    return this.http.get(SERVER_URL + "/api/publication/get/" + id, this.util.auth()).pipe(map((response)=> response));
  }

  public delete(id: Number){
    return this.http.delete(SERVER_URL + "/api/publication/delete/" + id, this.util.auth()).pipe(map((response)=> response));
  }

}
