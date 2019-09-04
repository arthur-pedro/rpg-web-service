import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsManagerComponent } from './news-manager.component';

const routes: Routes = [{path: 'news-manager', component: NewsManagerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsManagerRoutingModule { }
