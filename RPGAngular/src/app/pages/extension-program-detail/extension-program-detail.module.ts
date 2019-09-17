import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionProgramDetailRoutingModule } from './extension-program-detail-routing.module';
import { ExtensionProgramDetailComponent } from './extension-program-detail.component';

@NgModule({
  declarations: [ExtensionProgramDetailComponent],
  imports: [
    CommonModule,
    ExtensionProgramDetailRoutingModule
  ]
})
export class ExtensionProgramDetailModule { }
