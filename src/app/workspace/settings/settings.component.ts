import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  isLoading: boolean = false;
  error: string = '';
  employeeId: string | null;
  responseMessage: string = '';
  constructor(
    private _authService: AuthService,
    private _notification: NotificationService
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
    console.log('ok');
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      const currentPassword =
        this.changePasswordForm.get('currentPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const token = this._authService.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token: `${token}`,
      });
      console.log(this.employeeId, 'emid');
      console.log(headers, 'headers');
      this._authService
        .changePassword(this.employeeId!, currentPassword, newPassword, headers)
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
          },
          error: (err) => {
            console.log(changePasswordForm.value);
            this.isLoading = false;
            this.error = err.message;
            this._notification.showNotification(err.error.error, 'OK', 'error');
          },
        });
    }
  }
}
