import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private http: HttpClient
    ) { }

  public list(start, end, userId){
    var queryParam = "?start=" + start + "&length=" + end + "&userId=" + userId;
    return this.http.get(SERVER_URL + "/quest/list" + queryParam).pipe(map((response)=> response));
  }

  public apply(questId, userId){
    var queryParam = "?questId=" + questId + "&userId=" + userId;
    return this.http.get(SERVER_URL + "/quest/apply" + queryParam).pipe(map((response)=> response));
  }
}
