import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgModel, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrgRegitserComponent } from './org-regitser/org-regitser.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';


@NgModule({
  declarations: [LoginComponent, OrgRegitserComponent, AdminRegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ LoginComponent]
})

export class AuthModule { }