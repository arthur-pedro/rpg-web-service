import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClassService } from 'src/app/services/class/class.service';
import { loggedUser } from 'src/config';
import { UtilService, Tag } from 'src/app/services/util/util.service';
import { concat, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {

  filter: any;

  submitted: boolean = false;
  classForm: FormGroup;
  createdClass: any;

  isCreated: boolean = false;
  loadingSelect: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;

  tagList: any = []
  
  search$: Observable<Tag[]>;
  searchLoading = false;
  searchInput$ = new Subject<string>();
  selectedTags:  Tag[] = <any>[];


  constructor(
    private formGroup: FormBuilder,
    private classService: ClassService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.classForm = this.formGroup.group({
      name: [null, Validators.required],
      description: [''],
      userList: [[]],
      tags: [[]],
      creatorId: loggedUser.id
    })
    // this.listTag("");
    this.loadSearch();
  }
  
  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.classForm.valid){
      this.loading = false;
      return;
    }
    let myUserList = [];
    myUserList.push(loggedUser);
    this.classForm.patchValue({
      userList: myUserList
    });
    this.classForm.disable();
    this.classService.create(this.classForm.getRawValue()).subscribe(data => {
      this.isCreated = true;
      this.createdClass = data;
      this.classForm.enable();
      this.classForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
    },
    error => {
      this.classForm.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

    
  tip(type){
    
  }

  listTag(search){
    this.loadingSelect = true;
    this.util.listTag(search).subscribe(data => {
      this.loadingSelect = false;
      this.hasServerError = null;
      this.tagList = data;
    },
    error => {
      this.hasServerError = error;
      this.loadingSelect = false;
    });
  }

  trackByFn(item: Tag) {
    return item.id;
  }

  private loadSearch() {
    this.search$ = concat(
        of([]),
        this.searchInput$.pipe(
           debounceTime(200),
           distinctUntilChanged(),
           tap(() => this.searchLoading = true),
           switchMap(term => this.util.listTag(term).pipe(
               catchError(() => of([])),
               tap(() => this.searchLoading = false)
           )) 
        )
    );
  }

}
