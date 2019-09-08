import { Component, OnInit } from '@angular/core';
import { Tag, UtilService } from 'src/app/services/util/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event/event.service';
import { loggedUser } from 'src/config';

import { concat, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {


  eventForm: FormGroup;

  isCreated: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;
  formError:boolean = false;

  search$: Observable<Tag[]>;
  searchLoading = false;
  searchInput$ = new Subject<string>();
  selectedTags:  Tag[] = <any>[];

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
    private eventService: EventService
  ) { 
    this.eventForm = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      expired: false,
      isPublic: true,
      expireAt: [''],
      code: null,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      creatorId: loggedUser.id
    })
    this.loadSearch();
  }

  ngOnInit() {
  }

  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.eventForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    this.eventForm.disable();
    this.eventService.create(this.eventForm.getRawValue()).subscribe(data => {
      this.eventForm.enable();
      this.eventForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
    },
    error => {
      this.eventForm.enable();
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
}
