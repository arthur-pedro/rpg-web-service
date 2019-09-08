import { Component, OnInit } from '@angular/core';
import { Tag, UtilService, Campus } from 'src/app/services/util/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { concat, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';

import { loggedUser } from 'src/config';
import { ExtensionProgramService } from 'src/app/services/extension-program/extension-program.service';

@Component({
  selector: 'app-extension-program-form',
  templateUrl: './extension-program-form.component.html',
  styleUrls: ['./extension-program-form.component.css']
})
export class ExtensionProgramFormComponent implements OnInit {


  extensionForm: FormGroup;

  isCreated: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;
  formError:boolean = false;

  /* TAGS */
  search$: Observable<Tag[]>;
  searchLoading = false;
  searchInput$ = new Subject<string>();
  selectedTags:  Tag[] = <any>[];

  /* CAMPUS */
  searchCampus$: Observable<Campus[]>;
  searchLoadingCampus = false;
  searchInputCampus$ = new Subject<string>();
  selectedCampus:  Campus[] = <any>[];


  loggedUser: any;


  froadaDescription: any;
  public options: Object = {
    placeholderText: 'Digite a descrição da notícia aqui...',
    charCounterCount: true,
    heightMin: 200,
    heightMax: 200,
    listAdvancedTypes: true,
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL','codeMirror'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
  }


  constructor(
    private formGroup: FormBuilder,
    private util: UtilService,
    private extensionService: ExtensionProgramService
    
  ) { }

  ngOnInit() {
    this.extensionForm = this.formGroup.group({
      name: ['', Validators.required],
      description: [''],
      tags: ['', Validators.required],
      expertiseId: 1,
      campusId: ['', Validators.required],
      code: null,
      creatorId: loggedUser.id
    })
    this.loadSearch();
    this.loadSearchCampus();
  }

  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.extensionForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    this.extensionForm.disable();
    this.extensionService.create(this.extensionForm.getRawValue()).subscribe(data => {
      this.extensionForm.enable();
      this.extensionForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
    },
    error => {
      this.extensionForm.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

  closeAlertDisplay(event){
    switch(event){
      case 'created': 
        this.isCreated = false;
        break;
      case'serverError': 
        this.hasServerError = null;
        break;
      case 'formError': 
        this.formError = false;
        break;
    }
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

  private loadSearchCampus() {
    this.searchCampus$ = concat(
        of([]),
        this.searchInputCampus$.pipe(
           debounceTime(200),
           distinctUntilChanged(),
           tap(() => this.searchLoadingCampus = true),
           switchMap(term => this.util.listCampus(term).pipe(
               catchError(() => of([])),
               tap(() => this.searchLoadingCampus = false)
           )) 
        )
    );
  }
}
