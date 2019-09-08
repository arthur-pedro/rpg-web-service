import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private util:UtilService) { }

  public create(obj){
    return this.http.post(SERVER_URL + "/api/event/create", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public list(first, maxResults){
    return this.http.get(SERVER_URL + "/api/event/list?first="+first+"&maxResults="+maxResults, this.util.auth()).pipe(map((response)=> response));
  }
}
