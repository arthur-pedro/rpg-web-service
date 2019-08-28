import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from 'src/app/services/news/news.service';
import { ActivatedRoute } from '@angular/router';
import { loggedUser } from 'src/config';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent implements OnInit {

  public options: Object = {
    placeholderText: 'Digite o corpo da sua notícia aqui!',
    charCounterCount: true,
    heightMin: 200,
    heightMax: 200,
    listAdvancedTypes: true,
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
  }

  newsForm: FormGroup;
  classId: any;

  newsTip: boolean = false;
  loading: boolean = false;
  submitted: boolean = false;
  hasServerError: boolean = false;
  isCreated: boolean = false;

  booleanOption: any[] = ["s","n"]

  constructor(
    private formGroup: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.newsForm = this.formGroup.group({
      title: ['', Validators.required],
      description: [''],
      publicNews: [''],
      expireDate: ['', Validators.required],
      teamList: [[]],
      expired: false,
      creatorId: 0
    })
  }

  getTip(type){
    if(type == "title"){
      this.newsTip = true;
    }
  }

  createNews(){
  this.loading = true;
    this.submitted = true;
    if(!this.newsForm.valid){
      this.loading = false;
      return;
    }
    this.newsForm.patchValue({
      creatorId: loggedUser.id,
      teamList: [{id: this.classId ? this.classId : null}],
      publicNews: this.newsForm.value.publicNews == "Sim" ? true : false
    });
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
}
