import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit {

  keleton: any = [1,2,3,4,5];

  hasServerError = null;
  loading: boolean = false;

  eventList: any = [];
  loggedUser: any = null;

  first:any  = 0;
  maxResults:any = 10;

  constructor(
    private util: UtilService, 
    private eventService: EventService
    ){

    this.loading = true;
    this.util.getUserByToken(this.util.getAccessToken).subscribe(data => {
        if(!data)
          this.util.redirectTo('./main');
        this.loggedUser = data;
        if(!this.loggedUser || (this.loggedUser && !this.loggedUser.manager))
          this.util.redirectTo('./main');
        this.loading = false;
        this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
        this.util.redirectTo('./main');
      });
   }

  ngOnInit() {
    this.listEvents(0, this.maxResults);
  }

  listEvents(first, maxResults){
    this.loading = true;
    this.eventService.list(first, maxResults).subscribe((data: any) => {
      if(data && data.list){
        this.eventList = data;
      }
      this.loading = false;
      this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
    });
  }
}
