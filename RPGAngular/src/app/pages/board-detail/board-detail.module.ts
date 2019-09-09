import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardDetailRoutingModule } from './board-detail-routing.module';
import { BoardDetailComponent } from './board-detail.component';

@NgModule({
  declarations: [BoardDetailComponent],
  imports: [
    CommonModule,
    BoardDetailRoutingModule
  ]
})
export class BoardDetailModule { }
