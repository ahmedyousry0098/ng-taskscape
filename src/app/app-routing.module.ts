import { WorkspaceHomeComponent } from './workspace/workspace-home/workspace-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';
import { WorkspaceLayoutComponent } from './workspace/workspace-layout/workspace-layout.component';
import { TasksComponent } from './workspace/tasks/tasks.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { OrgRegitserComponent } from './auth/org-regitser/org-regitser.component';
import { AdminRegisterComponent } from './auth/admin-register/admin-register.component';
import { EmpLoginComponent } from './auth/emp-login/emp-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent },

  {
    path: 'workspace',
    component: WorkspaceLayoutComponent,
    loadChildren: () =>
      import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'org-register', component: OrgRegitserComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
