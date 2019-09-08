import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionProgramRoutingModule } from './extension-program-routing.module';
import { ExtensionProgramComponent } from './extension-program.component';

@NgModule({
  declarations: [ExtensionProgramComponent],
  imports: [
    CommonModule,
    ExtensionProgramRoutingModule
  ]
})
export class ExtensionProgramModule { }
