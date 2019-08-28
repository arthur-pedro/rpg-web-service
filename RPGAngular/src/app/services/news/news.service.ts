import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public create(obj){
    return this.http.post(SERVER_URL + "/news/create", obj).pipe(map((response)=> response));
  }
}
