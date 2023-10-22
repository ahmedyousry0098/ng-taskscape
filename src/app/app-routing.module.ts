import { WorkspaceHomeComponent } from './workspace/workspace-home/workspace-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';
import { WorkspaceLayoutComponent } from './workspace/workspace-layout/workspace-layout.component';
import { TasksComponent } from './workspace/tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent },

  {
    path: 'workspace',
    component: WorkspaceLayoutComponent,
    loadChildren: () =>
      import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  // {
  //   path: 'workspace',
  //   component: WorkspaceLayoutComponent,
  //   children: [
  //     {
  //       path: 'home',
  //       component: WorkspaceHomeComponent,
  //     },
  //     {
  //       path: 'tasks',
  //       component: TasksComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
