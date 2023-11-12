import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrgRegitserComponent } from './org-regitser/org-regitser.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangepasswordprofilefirstComponent } from './changepasswordprofilefirst/changepasswordprofilefirst.component';
import { AddpicComponent } from './changepasswordprofilefirst/addpic/addpic.component';

@NgModule({
  declarations: [
    LoginComponent,
    OrgRegitserComponent,
    AdminRegisterComponent,
    EmpLoginComponent,
    ChangepasswordprofilefirstComponent,
    AddpicComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
