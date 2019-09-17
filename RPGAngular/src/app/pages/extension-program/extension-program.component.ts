import { Component, OnInit } from '@angular/core';
import { ExtensionProgramService } from 'src/app/services/extension-program/extension-program.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-extension-program',
  templateUrl: './extension-program.component.html',
  styleUrls: ['./extension-program.component.css']
})
export class ExtensionProgramComponent implements OnInit {

  filter: any;
  skeleton: any = [1,2,3,4,5];

  extensionList: any = []

  loading: boolean = false;
  hasServerError: boolean = false;

  first:any  = 0;
  maxResults:any = 10;

  loggedUser: any;

  joined: boolean = false;

  tooltipOpt = {
    'placement': 'top',
    'show-delay': 2000,
    'hide-delay': 0,
    'animation-duration': 500,
    'theme': 'light',
    'shadow': true,
  }

  constructor(
    private extensionService: ExtensionProgramService,
    private  util: UtilService,
  ){

    this.loading = true;
    this.util.getLoggedUser().subscribe(data => {
        if(!data)
          this.util.redirectTo('/login');
        this.loggedUser = data;
        this.loading = false;
        this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
        this.util.redirectTo('/login');
      });
   }

  ngOnInit() {
    this.list(0, this.maxResults)
  }

  list(first, maxResults){
    this.loading = true;
    this.extensionService.list(first, maxResults).subscribe((data: any) => {
      if(data){
        this.extensionList = data;
      }
      this.loading = false;
      this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
    });
  }

  join(extension){
    this.joined = true;
  }

  closeAlertDisplay(event){
    switch(event){
      case 'created': 
        this.joined = false;
        break;
      case'serverError': 
        this.hasServerError = null;
        break;
    }
  }
}
