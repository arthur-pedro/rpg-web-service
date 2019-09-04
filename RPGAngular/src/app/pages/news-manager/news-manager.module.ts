import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsManagerRoutingModule } from './news-manager-routing.module';
import { NewsManagerComponent } from './news-manager.component';

@NgModule({
  declarations: [NewsManagerComponent],
  imports: [
    CommonModule,
    NewsManagerRoutingModule
  ]
})
export class NewsManagerModule { }
