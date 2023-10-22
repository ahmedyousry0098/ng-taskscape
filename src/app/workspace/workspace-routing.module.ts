import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceLayoutComponent } from './workspace-layout/workspace-layout.component';
import { WorkspaceHomeComponent } from './workspace-home/workspace-home.component';
import { TasksComponent } from './tasks/tasks.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
