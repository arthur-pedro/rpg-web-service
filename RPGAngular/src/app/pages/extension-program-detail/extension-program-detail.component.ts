import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { ExtensionProgramService } from 'src/app/services/extension-program/extension-program.service';

@Component({
  selector: 'app-extension-program-detail',
  templateUrl: './extension-program-detail.component.html',
  styleUrls: ['./extension-program-detail.component.css']
})
export class ExtensionProgramDetailComponent implements OnInit {

  loggedUser: any;

  extension: any = {};
  morePublications: any = [];

  isCreated: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;
  formError:boolean = false;

  commentForm: FormGroup
  
  constructor(
    private formGroup: FormBuilder,
    private route: ActivatedRoute,
    private util: UtilService,
    private extensionService: ExtensionProgramService

  ) { 
    this.extension.id = this.route.snapshot.paramMap.get('id');
    if(!this.extension.id) this.util.redirectTo("/main");
    this.loading = true;
    this.extensionService.get(this.extension.id).subscribe((data: any) => {
      // if(data)
      //   this.loadMorePublicaiton(data.tags);
      this.extension = data;
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
  }

}
