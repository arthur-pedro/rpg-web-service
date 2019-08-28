import { profileUrl, loggedUser } from './../../../config';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: any;
  loggedUser: any = loggedUser;
  profileUrl: string = profileUrl;

  showAchievement: boolean = false;
  hasServerError: boolean = false;
  loading: boolean = false;

  constructor(
    private homeService: HomeService,
    ) { }

  ngOnInit() {
    this.getUserById(loggedUser.id);
  } 

  show(){
    if(this.showAchievement){
      this.showAchievement = false;
    }else{
      this.showAchievement = true;
      setTimeout(() => { this.showAchievement = false; }, 4000);
    }

  }

  getUserById(userId){
    this.loading = true;
    //AQUI IRA PASSAR O ID DO USUÁRIO LOGADO
    this.homeService.getUser(userId).subscribe(data => {
      this.user = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }
}
