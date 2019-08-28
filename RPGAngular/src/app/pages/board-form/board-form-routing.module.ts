import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardFormComponent } from './board-form.component';

const routes: Routes = [{path: 'board-form', component: BoardFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardFormRoutingModule { }
