import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { ExtensionProgramService } from 'src/app/services/extension-program/extension-program.service';
import { BoardService } from 'src/app/services/board/board.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-extension-program-detail',
  templateUrl: './extension-program-detail.component.html',
  styleUrls: ['./extension-program-detail.component.css']
})
export class ExtensionProgramDetailComponent implements OnInit {

  loggedUser: any;
  selectedRequest: any;

  extension: any = {};
  morePublications: any = [];

  isCreated: boolean = false;
  submitted: boolean = false;
  hasServerError: boolean = false;
  formError: boolean = false;
  
  loading: boolean = false;
  loadingPublication: boolean = false;
  loadingEvents: boolean = false;
  showComment: boolean = false

  publicationList: any = [];
  members: any [];
  
  commentForm: FormGroup;
  publicationForm: FormGroup;
  
  constructor(
    private formGroup: FormBuilder,
    private route: ActivatedRoute,
    private util: UtilService,
    private extensionService: ExtensionProgramService,
    private boardService: BoardService,
    public modal: NgxSmartModalService
  ) { 
    this.extension.id = this.route.snapshot.paramMap.get('id');
    if(!this.extension.id) this.util.redirectTo("/main");
    this.loading = true;
    this.extensionService.get(this.extension.id).subscribe((data: any) => {
      this.extension = data;
      if(this.extension && this.extension.members){
        this.members = this.extension.members
      }
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });

    this.publicationForm = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      isPublic: false,
      creatorId: 0
    })

    this.commentForm = this.formGroup.group({
      body: ['', Validators.required],
      publicationId: 0,
      creatorId: 0
    });

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
    this.listPublication(this.extension.id);
  }

  listPublication(extensionId){
    this.loadingPublication = true;
    this.extensionService.listPublications(extensionId).subscribe(data => {
      this.publicationList = data;
      this.loadingPublication = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loadingPublication = false;
    });
  }

  listEvents(extensionId){
    // this.loadingPublication = true;
    // this.extensionService.listPublications(extensionId).subscribe(data => {
    //   this.publicationList = data;
    //   this.loadingPublication = false;
    //   this.hasServerError = null;
    // },
    // error => {
    //   this.hasServerError = error;
    //   this.loadingPublication = false;
    // });
  }

  createPublication(){
    this.loading = true;
    this.submitted = true;
    if(!this.publicationForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    if(this.publicationForm.value['tags']){
      this.publicationForm.value['tags'].forEach(element => {
        element = element.id;
      });
    }
    this.publicationForm.patchValue({creatorId: this.loggedUser.id})
    this.publicationForm.disable();
    this.boardService.create(this.publicationForm.getRawValue()).subscribe(data => {
      this.publicationForm.enable();
      this.publicationForm.reset();
      this.formError = false;
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
    },
    error => {
      this.publicationForm.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

  sendComment(publication){
    this.loading = true;
    this.submitted = true;
    if(!this.commentForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    let newComment = {
      body: this.commentForm.value['body'],
      createdAt: this.util.getDateNow(),
      creator: this.loggedUser,
      creatorId: this.loggedUser.id
    }
    this.commentForm.patchValue({creatorId: this.loggedUser.id, publicationId: publication.id})
    this.commentForm.disable();
    this.boardService.addComment(this.commentForm.getRawValue()).subscribe((data: any) => {
      this.commentForm.enable();
      this.commentForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
      this.showComment = false;
      if(data){
        publication.comments.push(newComment);
      }
    },
    error => {
      this.commentForm.enable();
      this.hasServerError = error;
      this.loading = false;
      this.showComment = false;
    });
  }

  memberRequest(event, request){
    this.selectedRequest = request;
    this.selectedRequest.action = event;
    this.modal.getModal('memberRequestModal').open()
  }

  answerMemberrequest(){
    let status = this.selectedRequest.action == 'accept' ? "ACTIVE" : "REJECTED"
    this.extensionService.answerMemberRequest(this.selectedRequest.id, this.extension.id, status).subscribe(data => {
      this.hasServerError = null;
      if(status == 'ACTIVE')
        this.extension.members.push(this.selectedRequest);
      let index = this.extension.requests.indexOf(this.selectedRequest);
      this.extension.requests.splice(index, 1);
      this.modal.getModal('memberRequestModal').close();
    },
    error => {
      this.hasServerError = error;
    });
  }

}
