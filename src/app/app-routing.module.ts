import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { OrgRegitserComponent } from './auth/org-regitser/org-regitser.component';
import { AdminRegisterComponent } from './auth/admin-register/admin-register.component';
import { EmpLoginComponent } from './auth/emp-login/emp-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent },
  { path: 'admin-register', component: AdminRegisterComponent},
  { path: 'org-register', component: OrgRegitserComponent},
  { path: 'emp-login', component: EmpLoginComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
