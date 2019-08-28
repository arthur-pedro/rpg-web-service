import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class/class.service';
import { loggedUser } from 'src/config';

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.css']
})
export class FormClassComponent implements OnInit {

  submitted: boolean = false;
  classForm: FormGroup;
  createdClass: any;

  isCreated: boolean = false;
  loading: boolean = false;
  hasServerError: boolean = false;

  constructor(
    private formGroup: FormBuilder,
    private classService: ClassService,
  ) { }

  ngOnInit() {
    this.classForm = this.formGroup.group({
      name: ['', Validators.required],
      userList: [[]],
      creatorId: loggedUser.id
    })
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
}
