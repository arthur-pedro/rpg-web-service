import { Component, OnInit } from '@angular/core';
import { profileUrl, loggedUser } from 'src/config';
import { ClassService } from 'src/app/services/class/class.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  filter: any;
  skeleton: any = [1,2,3,4,5];

  user: any;
  myClassList: any = [];

  profileUrl: string = profileUrl;

  maxmize: boolean = false;
  showingMyClass: boolean = false;
  loading: boolean = false;
  creating: boolean = false;
  hasServerError: boolean = false;

  selectedClass: any;
  classList: any = [];

  constructor(
    private classService: ClassService,
    private homeService: HomeService,
    
  ) { }

  ngOnInit() {
    this.listClass();
    this.getUserById(loggedUser.id);
  }

  displayFormControl(state){
    return this.creating = !state;
  }

  getUserById(userId){
    this.loading = true;
    //AQUI IRA PASSAR O ID DO USUÁRIO LOGADO
    this.homeService.getFullUser(userId).subscribe(data => {
      this.user = data;
      this.myClassList = this.user.teamList;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  listClass(){
    this.loading = true;
    this.classService.list().subscribe(data => {
      this.classList = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  
  exit(obj){
    this.loading = true;
    this.classService.exit(obj.id, loggedUser.id).subscribe(data => {
      this.listClass();
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }
  
  enter(obj){
    this.loading = true;
    this.classService.enter(obj.id, loggedUser.id).subscribe(data => {
      this.listClass();
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  detail(obj){
    this.selectedClass = obj;
  }

  isMember(){
    for(var indexCL = 0; indexCL < this.classList.length; indexCL++){
      var selectedClass = this.classList[indexCL];
      for(var indexUL = 0; indexUL < selectedClass.userList.length; indexUL++){
        if(selectedClass.userList[indexUL].id == this.user.id){
          selectedClass.member = true;
          break;
        }else{
          selectedClass.member = false;
        }
      }
    }
  }

  delete(obj){
    this.loading = true;
    this.classService.delete(obj.id).subscribe(data => {
      this.listClass();
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  showMyClass(state){
    return this.showingMyClass = !state;
  }

  maxmizeCard(){
    if(this.maxmize) this.maxmize = false;
    else this.maxmize = true;
  }
}
