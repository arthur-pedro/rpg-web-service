import { Component, OnInit } from '@angular/core';
import { profileUrl } from 'src/config';
import { UtilService } from 'src/app/services/util/util.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css']
})
export class ManagerUserComponent implements OnInit {

  skeleton: any = [1,2,3,4,5];

  hasServerError = null;
  loading: boolean = false;

  userList: any = [];
  loggedUser: any = null;

  first:any  = 0;
  maxResults:any = 10;

  constructor(private util: UtilService, private service: NewsService) { }

  ngOnInit() {
    this.listUser(0,0);
  }

  listUser(first, maxResults){
    this.loading = true;
    this.service.listUser(first, maxResults).subscribe((data: any) => {
      this.userList = data;
      this.loading = false;
      this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
    });
  }

}
