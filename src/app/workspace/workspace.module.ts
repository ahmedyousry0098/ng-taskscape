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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { StyleClassModule } from 'primeng/styleclass';
import { NotificationMessageComponent } from './settings/notification-message/notification-message.component';
import { AddProfilePicComponent } from './settings/add-profile-pic/add-profile-pic.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintDetailsComponent } from './sprint/sprint-details/sprint-details.component';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { AddsprintComponent } from './sprint/addsprint/addsprint.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { DatePipe } from '@angular/common';
import { CreatetaskComponent } from './tasks/createtask/createtask.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationChangeStatusComponent } from './tasks/confirmation-change-status/confirmation-change-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentsComponent } from './tasks/comments/comments.component';
import { RelativeTimePipe } from '../pipe/relative-time.pipe';

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
    NotificationMessageComponent,
    AddProfilePicComponent,
    SprintComponent,
    SprintDetailsComponent,
    DateFormatPipe,
    AddsprintComponent,
    ProjectDetailComponent,
    CreatetaskComponent,
    TaskDetailsComponent,
    ConfirmationChangeStatusComponent,
    CommentsComponent,
    RelativeTimePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkspaceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiSelectModule,
    FormsModule,
    StyleClassModule,
    DropdownModule,
    ModalModule.forRoot(),
    MatDialogModule,
  ],
  providers: [DatePipe],
})
export class WorkspaceModule {}
