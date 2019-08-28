import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import { loggedUser } from 'src/config';
import { ActivatedRoute } from '@angular/router';

declare const teste: any;

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  public options: Object = {
    placeholderText: 'Digite sua pergunta aqui!',
    charCounterCount: true,
    heightMin: 200,
    heightMax: 200,
    listAdvancedTypes: true,
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
  }

  titleTip: boolean = false;
  bodyTip: boolean = false;
  tagTip: boolean = false;

  showImport: boolean = false;
  showQuiz: boolean = false;
  showQuestion: boolean = false;
  
  importForm: any;
  quizForm: any;
  questionForm: any;
  taskForm: any;

  quizStep: number = 1;

  loading: boolean = false;
  submitted: boolean = false;
  hasServerError: boolean = false;

  selectedClassId: any;

  constructor(
    private formGroup: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { 

    this.selectedClassId = this.route.snapshot.paramMap.get("id")

    this.quizForm = this.formGroup.group({
      title: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      rightAnswer: 0,
    });

    this.questionForm = this.formGroup.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.importForm = this.formGroup.group({
      file: ['', Validators.required],
    });

    this.taskForm = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      creatorId: [0, Validators.required],
      teamId: [0, Validators.required],
      creatorName: ['', Validators.required],
      expireDate: ['', Validators.required],
      type: ['', Validators.required],
      validRank: ['', Validators.required],
    });
    
  }

  ngOnInit() {
  }

  getTip(type){
    if(type == 'title'){
      this.titleTip = true;
      this.bodyTip = false;
      this.tagTip = false;
    }else if(type == 'body'){
      this.titleTip = false;
      this.bodyTip = true;
      this.tagTip = false;
    }else if(type == 'tag'){
      this.titleTip = false;
      this.bodyTip = false;
      this.tagTip = true;
    }
  }

  createQuiz(){
    this.loading = true;
    this.submitted = true;
    if(!this.quizForm.valid){
      this.loading = false;
      return;
    }
    this.quizForm.disable();
    // this.taskService.create(this.questionForm.getRawValue()).subscribe(data => {
    //   this.isCreated = true;
    //   this.createdClass = data;
    //   this.classForm.enable();
    //   this.classForm.reset();
    //   this.submitted = false;
    //   this.loading = false;
    //   this.hasServerError = null;
    //   this.isCreated = true;
    // },
    // error => {
    //   this.classForm.enable();
    //   this.hasServerError = error;
    //   this.loading = false;
    // });
  }

  createQuestion(){
    this.loading = true;
    this.submitted = true;
    if(!this.questionForm.valid){
      this.loading = false;
      return;
    }
    this.taskForm = {
      creatorId: loggedUser.id,
      teamId:  this.selectedClassId,
      creatorName: loggedUser.firstName + " " + loggedUser.lastName,
      type: "question", 
      question: {
        title: this.questionForm.value.title,
        body: this.questionForm.value.body
      }
    }
    this.questionForm.disable();
    this.taskService.create(this.taskForm).subscribe(data => {
      this.questionForm.enable();
      this.questionForm.reset();
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.questionForm.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

  addAnswer(index){
    this.quizForm.value.rightAnswer = index;
  }

  importFile(){
    console.log(this.importForm)
  }

  onUploadSuccess($event){
    alert("Success: " + $event);
  }

  onUploadError($event){
    alert("error: " + $event);
  }

  nextStepQuiz(){
    this.quizStep++;
  }
  
  previousStepQuiz(){
    this.quizStep--;
  }
}
