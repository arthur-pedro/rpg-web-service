import { Component, OnInit } from '@angular/core';
import { profileUrl } from 'src/config';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css']
})
export class ManagerUserComponent implements OnInit {

  filter: any;
  profileUrl = profileUrl;

  constructor() { }

  ngOnInit() {
  }

}
