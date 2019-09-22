import { Component, OnInit } from '@angular/core';
import { ExtensionProgramService } from 'src/app/services/extension-program/extension-program.service';
import { UtilService } from 'src/app/services/util/util.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
  selectedExtension: any;

  joined: boolean = false;
  sendedRequest: boolean = false;
  isMember:boolean = false;
  mouseHover: boolean = false;
  hoverOption: 0;

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
    public modal: NgxSmartModalService,
  ){

    this.loading = true;
    this.util.getLoggedUser().subscribe(data => {
        if(!data)
          this.util.redirectTo('/login');
        this.loggedUser = data;
        this.loading = false;
        this.hasServerError = null;
        this.list(0, this.maxResults)
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
        this.util.redirectTo('/login');
    });
   }

  ngOnInit() {
  }

  list(first, maxResults){
    this.loading = true;
    this.extensionService.list(first, maxResults).subscribe((data: any) => {
      if(data){
        this.extensionList = data;
        this.extensionList.forEach(extension => {
          extension.requests.forEach(user => {
            if(user.id == this.loggedUser.id)
              extension.sendedRequest = true;
          });
          extension.members.forEach(user => {
            if(user.id == this.loggedUser.id)
              extension.isMember = true;
          });
        });
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
    this.loading = true;
    this.selectedExtension = extension;
    this.extensionService.doMemberRequest(this.loggedUser.id, extension.id).subscribe(data => {
      this.joined = true;
      extension.sendedRequest = true;
      this.loading = false;
    },
    error => {
      if(error && error.status == "304")
        this.modal.getModal('rejectedModal').open()
      this.hasServerError = error;
      this.loading = false;
    });
  }

  showDetailModal(extension){
    this.selectedExtension = extension;
    this.modal.getModal('detailModal').open()
  }
}
