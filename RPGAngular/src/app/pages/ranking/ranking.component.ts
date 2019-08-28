import { Component, OnInit } from '@angular/core';
import { loggedUser } from 'src/config';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  user: any = loggedUser;

  constructor() { }

  ngOnInit() {
  }

}
