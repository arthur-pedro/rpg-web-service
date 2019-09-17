import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/board/board.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  commentForm: FormGroup;
  loggedUser: any;

  publication: any = {};
  morePublications: any = [];

  showCommentField: boolean = false;

  isCreated: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;
  formError:boolean = false;
  
  constructor(
    private formGroup: FormBuilder,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private publicationService: BoardService
  ) { }

  ngOnInit() {
    this.publication.id = this.route.snapshot.paramMap.get('id');
    if(!this.publication.id) this.utilService.redirectTo("/main");
    this.loading = true;
    this.publicationService.get(this.publication.id).subscribe((data: any) => {
      if(data)
        this.loadMorePublicaiton(data.tags);
      this.publication = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });

    this.commentForm = this.formGroup.group({
      body: ['', Validators.required],
      publicationId: 0,
      creatorId: 0
    });

    this.loading = true;
    this.utilService.getLoggedUser().subscribe(data => {
      if(!data)
        this.utilService.redirectTo('/login');
      this.loggedUser = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
      this.utilService.redirectTo('/login');
    });
  }
  
  comment(){
    this.showCommentField = true;
  }

  like(){
    this.utilService.getLoggedUser().subscribe((user: any)=>{
      this.publicationService.addLike(this.publication, user).subscribe((res: any) => {
        if(res && res.data == 1)
          this.publication.likes++;
      },
      error => {
      });
    });
  }

  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.commentForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    let newComment = {
      body: this.commentForm.value['body'],
      createdAt: this.utilService.getDateNow(),
      creator: this.loggedUser,
      creatorId: this.loggedUser.id
    }
    this.commentForm.patchValue({creatorId: this.loggedUser.id, publicationId: this.publication.id})
    this.commentForm.disable();
    this.publicationService.addComment(this.commentForm.getRawValue()).subscribe((data: any) => {
      this.commentForm.enable();
      this.commentForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
      if(data){
        this.publication.comments.push(newComment);
      }
    },
    error => {
      this.commentForm.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

  loadMorePublicaiton(tags){
    let idList = []
    if(tags){
      tags.forEach(element=>{
        idList.push(element.id);
      });
    }
    this.loading = true;
    this.publicationService.listByTag(idList).subscribe(data => {
      this.morePublications = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }
}
