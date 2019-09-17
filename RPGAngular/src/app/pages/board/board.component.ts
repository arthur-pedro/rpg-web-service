import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { profileUrl } from 'src/config';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  tooltipOpt = {
    'placement': 'top',
    'show-delay': 2000,
    'hide-delay': 0,
    'animation-duration': 500,
    'theme': 'light',
    'shadow': true,
  }

  profileUrl = profileUrl;
  loggedUser: any;

  filter: any;
  skeleton: any = [1,2,3,4,5];

  publicationList: any = []

  loading: boolean = false;
  hasServerError: boolean = false;
  
  constructor(
    private boardService: BoardService,
    private util: UtilService,
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
      this.loading = false;
      this.util.redirectTo('/login');
    });
   }

  ngOnInit() {
    this.list();
  }

  list(){
    this.loading = true;
    this.boardService.list().subscribe(data => {
      this.publicationList = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  visitTag(tag){

  }

}
