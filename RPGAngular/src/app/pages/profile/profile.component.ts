import { Component, OnInit } from '@angular/core';
import { profileUrl, loggedUser } from 'src/config';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUrl = profileUrl;

  submitted: boolean = false;
  reload: boolean = false;
  loading: boolean = false;
  editingName: boolean = false;
  editingEmail: boolean = false;
  editingCourse: boolean = false;

  newsList: any = [];
  classList: any = [];
  taskList: any = [];
  hasServerError: boolean = false;

  selectedClass: any;
  user: any;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.getUserById(loggedUser.id);
  }

  getUserById(userId){
    this.loading = true;
    //AQUI IRA PASSAR O ID DO USUÁRIO LOGADO
    this.homeService.getUser(userId).subscribe(data => {
      this.user = data[0];
      this.classList = this.user.teamList;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  editName(name){
      this.editingName = true;
  }

  save(){
    this.editingName = false;
  }

}
