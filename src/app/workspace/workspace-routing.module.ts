import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceLayoutComponent } from './workspace-layout/workspace-layout.component';
import { WorkspaceHomeComponent } from './workspace-home/workspace-home.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProfilePicComponent } from './settings/add-profile-pic/add-profile-pic.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: WorkspaceHomeComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'projects/details',
    component: ProjectDetailsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/changeprofilepic',
    component: AddProfilePicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
