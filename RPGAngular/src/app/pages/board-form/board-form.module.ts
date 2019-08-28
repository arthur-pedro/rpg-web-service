import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardFormRoutingModule } from './board-form-routing.module';
import { BoardFormComponent } from './board-form.component';

@NgModule({
  declarations: [BoardFormComponent],
  imports: [
    CommonModule,
    BoardFormRoutingModule
  ]
})
export class BoardFormModule { }
