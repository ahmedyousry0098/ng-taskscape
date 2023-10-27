import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsSideBarComponent } from './controls-side-bar/controls-side-bar.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { WorkspaceHomeComponent } from './workspace-home/workspace-home.component';
import { WorkspaceLayoutComponent } from './workspace-layout/workspace-layout.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ControlsSideBarComponent,
    ProjectsComponent,
    TasksComponent,
    WorkspaceHomeComponent,
    WorkspaceLayoutComponent,
    NotificationComponent,
    ProfileComponent,
    SettingsComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkspaceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class WorkspaceModule {}
