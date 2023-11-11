import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { __values } from 'tslib';
@Component({
  selector: 'app-addpic',
  templateUrl: './addpic.component.html',
  styleUrls: ['./addpic.component.css'],
})
export class AddpicComponent {
  isLoading: boolean = false;
  employeeId: string | null;
  imageUrl: string = '../../../assets/noavatar.jpg';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private _notification: NotificationService,
    private _router: Router
  ) {
    this.employeeId = this.authService.getUserIdFromToken();

    this.addPhotoForm = new FormGroup({
      photo: new FormControl('', [Validators.required]),
    });
  }

  addPhotoForm: FormGroup | any = new FormGroup({});
  handleFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.addPhotoForm.patchValue({ photo: files[0] });
      this.imageUrl = URL.createObjectURL(files[0]);
    }
  }
  skip() {
    this.changeFristStatus();
    this._router.navigate(['/workspace']);
  }

  handleAddPhoto() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('photo', this.addPhotoForm.get('photo').value);

    this.employeeService.addPhoto(this.employeeId, formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.employeeService.changePhoto();
        this._notification.showNotification(res.message, 'OK', 'success');
        this.changeFristStatus();
        this._router.navigate(['/workspace']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this._notification.showNotification(err.error.message, 'OK', 'error');
      },
    });
  }

  changeFristStatus() {
    console.log(this.authService.getUserIdFromToken());
    this.employeeService
      .changeFreshStatus(this.authService.getUserIdFromToken())
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
