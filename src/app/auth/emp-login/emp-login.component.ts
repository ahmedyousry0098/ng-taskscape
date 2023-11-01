import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
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
    private toasterService: ToasterService
  ) {}

  isLoading: boolean = false;

  employeeLoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
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
          this.changeFristStatus();
          this._router.navigate(['/workspace/settings']);
        } else {
          this._router.navigate(['/workspace']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toasterService.error('You havn\'t entered data correctly')
      },
    });
  }

  changeFristStatus() {
    console.log(this._authService.getUserIdFromToken());
    this._employeeService
      .changeFreshStatus(this._authService.getUserIdFromToken())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
