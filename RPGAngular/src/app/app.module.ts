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
import { AlwaysAuthGuard } from './services/guard/AlwaysAuthGuard';
import { OnlyLoggedInUsersGuard } from './services/guard/onlyLoggedCreator';
import { NewsManagerComponent } from './pages/news-manager/news-manager.component';
import { OnlyManagerGuard } from './services/guard/onlyManagerGuard';
import { PaginationDisplayComponent } from './components/pagination-display/pagination-display.component';
import { NewsFormComponent } from './pages/news-form/news-form.component';
import { EventManagerComponent } from './pages/event-manager/event-manager.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { EventComponent } from './pages/event/event.component';
import { AlertDisplayComponent } from './components/alert-display/alert-display.component';
import { ExtensionProgramFormComponent } from './pages/extension-program-form/extension-program-form.component';
import { ExtensionProgramComponent } from './pages/extension-program/extension-program.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { ExtensionProgramDetailComponent } from './pages/extension-program-detail/extension-program-detail.component';

import { ChartsModule } from 'ng2-charts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
    TaskComponent,
    AchievementsComponent,
    QuestComponent,
    NewsComponent,
    BoardComponent,
    RankingComponent,
    EventComponent,

    
    /* DETAIL */
    ClassDetailComponent,
    NewsDetailComponent,
    EventDetailComponent,
    BoardDetailComponent,
    ExtensionProgramDetailComponent,

    /* MANAGER */
    ManagerComponent,
    ManagerUserComponent,
    ManagerImportComponent,
    ManagerQuestComponent,
    NewsManagerComponent,
    EventManagerComponent,
    ExtensionProgramComponent,
    
    /* FORMS */
    ClassFormComponent,
    BoardFormComponent,
    NewsFormComponent,
    EventFormComponent,
    ExtensionProgramFormComponent,

    FormClassComponent,
    FormTaskComponent,
    FormNewsComponent,
    FormEventComponent,
    
    /* UTIL COMPONENTS */
    UserDisplayComponent,
    PaginationDisplayComponent,
    HeaderDisplayComponent,
    PaginationDisplayComponent,
    AlertDisplayComponent,
    ExtensionProgramFormComponent,
    NotFoundComponent,
    
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
    NgSelectModule,
    ChartsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    AlwaysAuthGuard,
    OnlyLoggedInUsersGuard,
    OnlyManagerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
