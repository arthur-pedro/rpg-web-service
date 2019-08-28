import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-import',
  templateUrl: './manager-import.component.html',
  styleUrls: ['./manager-import.component.css']
})
export class ManagerImportComponent implements OnInit {

  importForm: any;
  config: any;
  
  constructor(
    private formGroup: FormBuilder,
  ) {
    this.importForm = this.formGroup.group({
      file: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  onUploadSuccess($event){
    alert("Success: " + $event);
  }

  onUploadError($event){
    alert("error: " + $event);
  }

}
