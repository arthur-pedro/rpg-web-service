import { ClassComponent } from './pages/class/class.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { FormClassComponent } from './components/form-class/form-class.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { TaskComponent } from './pages/task/task.component';
import { ClassDetailComponent } from './pages/class-detail/class-detail.component';
import { FormNewsComponent } from './components/form-news/form-news.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SERVER_URL } from 'src/config';
import { FormEventComponent } from './components/form-event/form-event.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { QuestComponent } from './pages/quest/quest.component';
import { NewsComponent } from './pages/news/news.component';
import { BoardComponent } from './pages/board/board.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { ManagerUserComponent } from './pages/manager-user/manager-user.component';
import { ManagerImportComponent } from './pages/manager-import/manager-import.component';
import { ManagerQuestComponent } from './pages/manager-quest/manager-quest.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

//EXTERNAL IMPORT
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ClassFormComponent } from './pages/class-form/class-form.component';
import { HeaderDisplayComponent } from './components/header-display/header-display.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BoardFormComponent } from './pages/board-form/board-form.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   url: SERVER_URL + "/task/upload/img",
   maxFilesize: 10000,
   acceptedFiles: 'image/*,.pdf'
 };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ClassComponent,
    FormClassComponent,
    TaskComponent,
    FormTaskComponent,
    ClassDetailComponent,
    FormNewsComponent,
    FormEventComponent,
    ManagerComponent,
    AchievementsComponent,
    QuestComponent,
    NewsComponent,
    BoardComponent,
    RankingComponent,
    UserDisplayComponent,
    ManagerUserComponent,
    ManagerImportComponent,
    ManagerQuestComponent,
    NewsDetailComponent,
    ClassFormComponent,
    HeaderDisplayComponent,
    BoardFormComponent
  ],
  imports: [
    DropzoneModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    NgCircleProgressModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
