import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag, UtilService } from 'src/app/services/util/util.service';
import { loggedUser } from 'src/config';

import { concat, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {

  newsForm: FormGroup;

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
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
  }

  constructor(
    private formGroup: FormBuilder,
    private util: UtilService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsForm = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      expired: false,
      isPublic: true,
      expireAt: ['', Validators.required],
      creatorId: loggedUser.id
    })
    this.loadSearch();
  }


  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.newsForm.valid){
      this.formError = true;
      this.loading = false;
      return;
    }
    this.newsForm.disable();
    this.newsService.create(this.newsForm.getRawValue()).subscribe(data => {
      this.newsForm.enable();
      this.newsForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      this.isCreated = true;
    },
    error => {
      this.newsForm.enable();
      this.hasServerError = error;
      this.loading = false;
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
}
