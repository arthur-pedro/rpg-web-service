import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassFormRoutingModule } from './class-form-routing.module';
import { ClassFormComponent } from './class-form.component';

@NgModule({
  declarations: [ClassFormComponent],
  imports: [
    CommonModule,
    ClassFormRoutingModule
  ]
})
export class ClassFormModule { }
