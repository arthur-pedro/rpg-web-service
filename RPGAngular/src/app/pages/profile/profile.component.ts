import { Component, OnInit } from '@angular/core';
import { profileUrl, loggedUser } from 'src/config';
import { HomeService } from 'src/app/services/home/home.service';
import { UtilService } from 'src/app/services/util/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  submitted: boolean = false;
  reload: boolean = false;
  loading: boolean = false;

  newsList: any = [];
  classList: any = [];
  taskList: any = [];
  hasServerError: boolean = false;

  selectedClass: any;
  selectedUser: any = {};

  loggedUser: any;

  constructor(
    private homeService: HomeService,
    private util: UtilService,
    private route: ActivatedRoute,
  ) {
    this.loading = true;
    this.util.getLoggedUser().subscribe((data: any) => {
      if(!data)
        this.util.redirectTo('/login');
      this.loggedUser = data;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.util.redirectTo('/login');
    });
    
    this.selectedUser.id = this.route.snapshot.paramMap.get('id');
    if(!this.selectedUser.id) this.util.redirectTo("/main");
    this.homeService.getUser(this.selectedUser.id).subscribe((data: any) => {
      if(!data)
        this.util.redirectTo('/main');
      this.selectedUser = data;
      this.loading = false;
      this.hasServerError = null;
      },
      error => {
        this.util.redirectTo('/main');
        this.hasServerError = error;
        this.loading = false;
    });
  }

  ngOnInit() {
  }


}
