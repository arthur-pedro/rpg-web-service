import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient, private util: UtilService) { }

  public list(){
    return this.http.get(SERVER_URL + "/team/list", this.util.auth()).pipe(map((response)=> response));
  }

  public getById(classId){
    return this.http.get(SERVER_URL + "/team/" + classId, this.util.auth()).pipe(map((response)=> response));
  }

  public create(obj){
    return this.http.post(SERVER_URL + "/team/create", obj, this.util.auth()).pipe(map((response)=> response));
  }
  
  public exit(teamId, userId){
    return this.http.put(SERVER_URL + "/team/exit/" + teamId + "/" + userId, this.util.auth()).pipe(map((response)=> response));
  }
  
  public enter(teamId, userId){
    return this.http.put(SERVER_URL + "/team/enter/" + teamId + "/" + userId, this.util.auth()).pipe(map((response)=> response));
  }

  public delete(teamId){
    return this.http.delete(SERVER_URL + "/team/delete/"+teamId, this.util.auth()).pipe(map((response)=> response));
  }

  public deleteTask(taskId){
    return this.http.delete(SERVER_URL + "/team/delete/task/" + taskId, this.util.auth()).pipe(map((response)=> response));
  }

}
