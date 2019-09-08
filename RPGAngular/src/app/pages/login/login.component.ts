import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  loading:boolean = false;
  hasServerError: boolean = false;
  submitted: boolean = false;

  formError: boolean = false;
  
  constructor(
    private formGroup: FormBuilder,
    private util: UtilService
  ) {
    this.credentials = this.formGroup.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    })
   }

  ngOnInit() {
  }

  login(){
    this.submitted = true;
    if(!this.credentials.valid){
      this.formError = true;
      return;
    }
    this.loading = true;
    this.credentials.disable;
    this.util.login(this.credentials.getRawValue()).subscribe(data => {
      this.submitted = false;
      this.loading = false;
      this.hasServerError = null;
      localStorage.setItem("jwt", JSON.stringify(data));
      this.util.redirectTo('./main');
    },
    error => {
      this.credentials.enable();
      this.hasServerError = error;
      this.loading = false;
    });
  }

  closeAlertDisplay(event){
    switch(event){
      case'serverError': 
        this.hasServerError = null;
        break;
      case 'formError': 
        this.formError = false;
        break;
    }
  }
}
