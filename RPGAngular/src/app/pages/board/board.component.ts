import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { profileUrl } from 'src/config';

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

  filter: any;
  skeleton: any = [1,2,3,4,5];

  publicationList: any = []

  loading: boolean = false;
  hasServerError: boolean = false;
  
  constructor(
    private boardService: BoardService
  ) { }

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
