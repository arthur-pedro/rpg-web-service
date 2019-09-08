import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventFormRoutingModule } from './event-form-routing.module';
import { EventFormComponent } from './event-form.component';

@NgModule({
  declarations: [EventFormComponent],
  imports: [
    CommonModule,
    EventFormRoutingModule
  ]
})
export class EventFormModule { }
