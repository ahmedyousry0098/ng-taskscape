import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-profile-pic',
  templateUrl: './add-profile-pic.component.html',
  styleUrls: ['./add-profile-pic.component.css'],
})
export class AddProfilePicComponent {
  isLoading: boolean = false;
  employeeId: string | null;
  imageUrl: string = '../../../assets/noavatar.jpg';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private _notification: NotificationService
  ) {
    this.employeeId = this.authService.getUserIdFromToken();

    this.addPhotoForm = new FormGroup({
      photo: new FormControl('', [Validators.required]),
    });
  }
  ngOnchange() {
    this.employeeId = this.authService.getUserIdFromToken();
  }
  ngOnInit() {
    this.loadEmployeePhoto();
  }

  loadEmployeePhoto() {
    this.employeeService.getEmployeeData().subscribe({
      next: (res) => {
        if (
          res.employee.profile_photo &&
          res.employee.profile_photo.secure_url
        ) {
          this.imageUrl = res.employee.profile_photo.secure_url;
        } else {
          this.imageUrl = '../../../assets/noavatar.jpg';
        }
      },
      error: (err) => {
        console.log(err);
      },
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

  handleAddPhoto() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('photo', this.addPhotoForm.get('photo').value);

    this.employeeService.addPhoto(this.employeeId, formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.employeeService.changePhoto();
        this._notification.showNotification(res.message, 'OK', 'success');
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this._notification.showNotification(err.error.message, 'OK', 'error');
      },
    });
  }
}
