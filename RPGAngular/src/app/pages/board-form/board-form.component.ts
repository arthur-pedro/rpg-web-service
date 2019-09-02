import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { loggedUser } from 'src/config';
import { concat, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { Tag, UtilService } from 'src/app/services/util/util.service';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  publicationForm: FormGroup;

  isCreated: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;

  search$: Observable<Tag[]>;
  searchLoading = false;
  searchInput$ = new Subject<string>();
  selectedTags:  Tag[] = <any>[];

  loggedUser: any;

  constructor(
    private formGroup: FormBuilder,
    private util: UtilService,
    private boardService: BoardService
  ) { 

    // this.loggedUser = util.getLoggedUser();
  }

  ngOnInit() {
    this.publicationForm = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      creatorId: loggedUser.id
    })
    this.loadSearch();
  }

  create(){
    this.loading = true;
    this.submitted = true;
    if(!this.publicationForm.valid){
      this.loading = false;
      return;
    }
    this.publicationForm.disable();
    this.boardService.create(this.publicationForm.getRawValue()).subscribe(data => {
      this.publicationForm.enable();
      this.publicationForm.reset();
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
