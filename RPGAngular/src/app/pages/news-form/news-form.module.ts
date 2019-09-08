import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFormRoutingModule } from './news-form-routing.module';
import { NewsFormComponent } from './news-form.component';

@NgModule({
  declarations: [NewsFormComponent],
  imports: [
    CommonModule,
    NewsFormRoutingModule
  ]
})
export class NewsFormModule { }
