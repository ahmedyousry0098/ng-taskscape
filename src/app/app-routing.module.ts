import { WorkspaceHomeComponent } from './workspace/workspace-home/workspace-home.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';
import { WorkspaceLayoutComponent } from './workspace/workspace-layout/workspace-layout.component';
import { TasksComponent } from './workspace/tasks/tasks.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { OrgRegitserComponent } from './auth/org-regitser/org-regitser.component';
import { AdminRegisterComponent } from './auth/admin-register/admin-register.component';
import { EmpLoginComponent } from './auth/emp-login/emp-login.component';
import { authGuard } from './guard/auth.guard';
import { landingGuard } from './guard/landing.guard';
import { ChangepasswordComponent } from './workspace/settings/changepassword/changepassword.component';
import { AddProfilePicComponent } from './workspace/settings/add-profile-pic/add-profile-pic.component';
import { ChangepasswordprofilefirstComponent } from './auth/changepasswordprofilefirst/changepasswordprofilefirst.component';
import { AddpicComponent } from './auth/changepasswordprofilefirst/addpic/addpic.component';
import { freshGuard } from './guard/fresh.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [landingGuard],
  },

  {
    path: 'workspace',
    component: WorkspaceLayoutComponent,
    canActivate: [authGuard],

    loadChildren: () =>
      import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  {
    path: 'change-password',
    component: ChangepasswordprofilefirstComponent,
    canActivate: [authGuard, freshGuard],
  },
  {
    path: 'add-pic',
    component: AddpicComponent,
    canActivate: [authGuard, freshGuard],
  },

  { path: 'admin-register', component: AdminRegisterComponent },
  {
    path: 'employee-login',
    component: EmpLoginComponent,
    canActivate: [landingGuard],
  },
  { path: 'org-register', component: OrgRegitserComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
