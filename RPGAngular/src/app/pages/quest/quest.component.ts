import { Component, OnInit } from '@angular/core';
import { QuestService } from 'src/app/services/quest/quest.service';
import { loggedUser } from 'src/config';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {

  filter: any;
  user: any;

  showingMyQuest: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;

  skeleton: any = [1,2,3,4,5];

  myQuestList: any = [];
  questList: any = [];

  constructor(
    private questService: QuestService,
    private homeService: HomeService
  ) { 

    this.loading = true;
    //AQUI IRA PASSAR O ID DO USUÁRIO LOGADO
    this.homeService.getFullUser(loggedUser.id).subscribe(data => {
      this.user = data;
      this.myQuestList = this.user.questList;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.list(0, 10);
  }

  list(start, length){
    this.loading = true;
    this.questService.list(start, length, loggedUser.id).subscribe(data => {
      this.questList = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }
  
  apply(quest){
    this.loading = true;
    this.questService.apply(quest.id, loggedUser.id).subscribe(data => {
      this.list(0, 10);
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  

}
