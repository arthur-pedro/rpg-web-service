import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private util: UtilService) { }

  public list(first, maxResults){
    return this.http.get(SERVER_URL + "/api/news/list", this.util.auth()).pipe(map((response)=> response));
  }

  public create(obj: any){
    return this.http.post(SERVER_URL + "/api/news/create", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public update(obj: any){
    return this.http.put(SERVER_URL + "/api/news/update", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public get(id: Number){
    return this.http.get(SERVER_URL + "/api/news/get/" + id, this.util.auth()).pipe(map((response)=> response));
  }

  public delete(id: Number){
    return this.http.delete(SERVER_URL + "/api/news/delete/" + id, this.util.auth()).pipe(map((response)=> response));
  }
}
