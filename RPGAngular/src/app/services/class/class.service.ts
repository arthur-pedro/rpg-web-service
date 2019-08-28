import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  public list(){
    return this.http.get(SERVER_URL + "/team/list").pipe(map((response)=> response));
  }

  public getById(classId){
    return this.http.get(SERVER_URL + "/team/" + classId).pipe(map((response)=> response));
  }

  public create(obj){
    return this.http.post(SERVER_URL + "/team/create", obj).pipe(map((response)=> response));
  }
  
  public exit(teamId, userId){
    return this.http.put(SERVER_URL + "/team/exit/" + teamId + "/" + userId, null).pipe(map((response)=> response));
  }
  
  public enter(teamId, userId){
    return this.http.put(SERVER_URL + "/team/enter/" + teamId + "/" + userId, null).pipe(map((response)=> response));
  }

  public delete(teamId){
    return this.http.delete(SERVER_URL + "/team/delete/"+teamId).pipe(map((response)=> response));
  }

  public deleteTask(taskId){
    return this.http.delete(SERVER_URL + "/team/delete/task/" + taskId).pipe(map((response)=> response));
  }

}
