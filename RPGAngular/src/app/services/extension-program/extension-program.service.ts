import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtensionProgramService {

  constructor(private http: HttpClient, private util:UtilService) { }

  public create(obj){
    return this.http.post(SERVER_URL + "/api/extension/create", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public list(first, maxResults){
    return this.http.get(SERVER_URL + "/api/extension/list?first="+first+"&maxResults="+maxResults, this.util.auth()).pipe(map((response)=> response));
  }
}
