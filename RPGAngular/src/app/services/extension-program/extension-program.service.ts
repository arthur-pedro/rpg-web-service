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

  public update(obj: any){
    return this.http.put(SERVER_URL + "/api/pextensionublication/update", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public get(id: Number){
    return this.http.get(SERVER_URL + "/api/extension/get/" + id, this.util.auth()).pipe(map((response)=> response));
  }

  public delete(id: Number){
    return this.http.delete(SERVER_URL + "/api/extension/delete/" + id, this.util.auth()).pipe(map((response)=> response));
  }

  public addComment(obj: any){
    return this.http.post(SERVER_URL + "/api/extension/add/comment", obj, this.util.auth()).pipe(map((response)=> response));
  }

  public addLike(publication: any, user: any){
    return this.http.post(SERVER_URL + "/api/extension/add/like", {publication, user}, this.util.auth()).pipe(map((response)=> response));
  }

  public listPublications(extensionId){
    return this.http.get(SERVER_URL + "/api/extension/list/publications?extensionId="+ extensionId, this.util.auth()).pipe(map((response)=> response));
  }

  public answerMemberRequest(userId: any, extensinoId: any, status: any){
    return this.http.post(SERVER_URL + "/api/extension/answerMemberRequest?userId="+userId+"&extensionId="+extensinoId+"&status="+status, null, this.util.auth()).pipe(map((response)=> response));
  }
  
  public doMemberRequest(userId: any, extensinoId: any){
    return this.http.post(SERVER_URL + "/api/extension/doMemberRequest?userId="+userId+"&extensionId="+extensinoId, null, this.util.auth()).pipe(map((response)=> response));
  }
}
