import { profileUrl, loggedUser } from './../../../config';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { UtilService } from 'src/app/services/util/util.service';
import {CanActivate} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: any;
  loggedUser: any;
  profileUrl: string = profileUrl;

  showAchievement: boolean = false;
  hasServerError: boolean = false;
  loading: boolean = false;

  constructor(
    private homeService: HomeService,
    private util: UtilService,
    ) {

      this.loading = true;
      if(this.util.hasLoggedUser){
        this.util.getUserByToken(this.util.getToken().access_token).subscribe(data => {
          this.loggedUser = data;
          this.loading = false;
          this.hasServerError = null;
        },
        error => {
          this.hasServerError = error;
          this.loading = false;
        });
      }

     }

  ngOnInit() {
  } 

  show(){
    if(this.showAchievement){
      this.showAchievement = false;
    }else{
      this.showAchievement = true;
      setTimeout(() => { this.showAchievement = false; }, 4000);
    }

  }

  loggout(){
    localStorage.clear();
    this.util.redirectTo("/login");
  }
}
