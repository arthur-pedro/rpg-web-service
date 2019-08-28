import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SERVER_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  public create(obj){
    return this.http.post(SERVER_URL + "/task/create", obj).pipe(map((response)=> response));
  }
}
