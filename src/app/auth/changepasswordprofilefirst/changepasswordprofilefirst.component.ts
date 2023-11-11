import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-changepasswordprofilefirst',
  templateUrl: './changepasswordprofilefirst.component.html',
  styleUrls: ['./changepasswordprofilefirst.component.css'],
})
export class ChangepasswordprofilefirstComponent {
  isLoading: boolean = false;
  error: string = '';
  employeeId: string | null;
  responseMessage: string = '';

  constructor(
    private _authService: AuthService,
    private _notification: NotificationService,
    private _employeeService: EmployeeService,
    private _router: Router
  ) {
    this.employeeId = this._authService.getUserIdFromToken();
  }
  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  changePassword(changePasswordForm: FormGroup) {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      const currentPassword =
        this.changePasswordForm.get('currentPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      this._employeeService
        .changePassword(this.employeeId!, currentPassword, newPassword)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            const token = res.token;
            this._authService.setLoggedIn(token);
            this.error = '';
            this.changePasswordForm.reset();
            this.responseMessage = res.message;
            this._notification.showNotification(res.message, 'OK', 'success');
            this._router.navigate(['/add-pic']);
          },
          error: (err) => {
            console.log(changePasswordForm.value);
            this.isLoading = false;

            this._notification.showNotification(err.error.error, 'OK', 'error');
          },
        });
    }
  }
}
