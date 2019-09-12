import { ClassComponent } from './pages/class/class.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';
import { ClassDetailComponent } from './pages/class-detail/class-detail.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { QuestComponent } from './pages/quest/quest.component';
import { NewsComponent } from './pages/news/news.component';
import { BoardComponent } from './pages/board/board.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ManagerUserComponent } from './pages/manager-user/manager-user.component';
import { ManagerQuestComponent } from './pages/manager-quest/manager-quest.component';
import { ManagerImportComponent } from './pages/manager-import/manager-import.component';
import { ClassFormComponent } from './pages/class-form/class-form.component';
import { BoardFormComponent } from './pages/board-form/board-form.component';
import { OnlyLoggedInUsersGuard } from './services/guard/onlyLoggedCreator';
import { AlwaysAuthGuard } from './services/guard/AlwaysAuthGuard';
import { NewsManagerComponent } from './pages/news-manager/news-manager.component';
import { OnlyManagerGuard } from './services/guard/onlyManagerGuard';
import { NewsFormComponent } from './pages/news-form/news-form.component';
import { EventManagerComponent } from './pages/event-manager/event-manager.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventComponent } from './pages/event/event.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { ExtensionProgramComponent } from './pages/extension-program/extension-program.component';
import { ExtensionProgramFormComponent } from './pages/extension-program-form/extension-program-form.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';

const routes: Routes = [
  { path: 'main', component: NavigationComponent, 
    canActivate: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: "", component: HomeComponent
      },
      {
        path: "profile", component: ProfileComponent
      },
      /* CLASS */
      {
        path: "class", component: ClassComponent,
      },
      {
        path: "class/detail/:id", component: ClassDetailComponent
      },
      {
        path: "class/form", component: ClassFormComponent,
      },
      /* TASK */
      {
        path: "task", component: TaskComponent
      },
      {
        path: "manager", component: ManagerComponent
      },
      {
        path: "manager/user", component: ManagerUserComponent
      },
      {
        path: "manager/quest", component: ManagerQuestComponent
      },
      {
        path: "manager/user/import", component: ManagerImportComponent
      },
      {
        path: "achievements", component: AchievementsComponent
      },
      {
        path: "quest", component: QuestComponent
      },
      
      /* NEWS */
      {
        path: "news", component: NewsComponent
      },
      {
        path: "news/detail/:id", component: NewsDetailComponent,
      },
      {
        path: "news/form", component: NewsFormComponent
      },
      {
        path: "manager/news", component: NewsManagerComponent,
      },
      
      /* EVENT */
      {
        path: "event", component: EventComponent
      },
      {
        path: "event/detail/:id", component: EventDetailComponent
      },
      {
        path: "event/form", component: EventFormComponent
      },
      {
        path: "manager/event", component: EventManagerComponent,
      },
      /* PUBLICATION */
      {
        path: "board",  component: BoardComponent
      },
      {
        path: "board/form", component: BoardFormComponent
      },
      {
        path: "board/detail/:id", component: BoardDetailComponent
      },
      /* EXTENSION PROGRAM */
      {
        path: "extension", component: ExtensionProgramComponent
      },
      {
        path: "extension/form", component: ExtensionProgramFormComponent
      },
      /* RANKING */
      {
        path: "ranking", component: RankingComponent
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
