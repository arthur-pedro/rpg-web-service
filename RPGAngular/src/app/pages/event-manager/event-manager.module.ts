import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagerRoutingModule } from './event-manager-routing.module';
import { EventManagerComponent } from './event-manager.component';

@NgModule({
  declarations: [EventManagerComponent],
  imports: [
    CommonModule,
    EventManagerRoutingModule
  ]
})
export class EventManagerModule { }
