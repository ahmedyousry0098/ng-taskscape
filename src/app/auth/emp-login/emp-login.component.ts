import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css'],
})
export class EmpLoginComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _employeeService: EmployeeService,
    private toasterService: ToasterService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.triggerAnimation();
  }

  triggerAnimation() {
    const element = this.elementRef.nativeElement.querySelector('.emp-login');
    this.renderer.addClass(element, 'animate__animated');
    this.renderer.addClass(element, 'animate__fadeIn');
  }

  isLoading: boolean = false;

  employeeLoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });
  resetPasswordForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  handleEmployeeLogin(employeeLoginForm: FormGroup) {
    this.isLoading = true;
    const data = { ...this.employeeLoginForm.value };
    this._authService.employeeLogin(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        const token = res.token;
        this._authService.setLoggedIn(token);
        const isFresh = res.employee.isFresh;

        if (isFresh) {
          this._router.navigate(['/change-password']);
        } else {
          this._router.navigate(['/workspace']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

        this.toasterService.error("You havn't entered data correctly");
      },
    });
  }

  handleForgotPassword(forgotPasswordForm: FormGroup) {
    this.isLoading = true;
    const data = { ...this.forgotPasswordForm.value };
    this._authService.forgotPassword(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.toasterService.error(err.error.error);
        this.isLoading = false;
      },
    });
  }
  handleResetPassword(resetPasswordForm: FormGroup) {
    const data = { ...this.resetPasswordForm.value };
    this._authService.forgotPassword(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
