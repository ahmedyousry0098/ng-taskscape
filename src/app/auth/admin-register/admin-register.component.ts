import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  constructor(private _authService: AuthService, private _router: Router) { }

  isLoading: boolean = false;
  adminRegisterForm: FormGroup = new FormGroup({
    adminName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    organization: new FormControl(null, [Validators.required]),
  })

  handleOAdminRegister(adminRegisterForm: FormGroup) {
    this.isLoading = true;
    this._authService.adminRegister(this.adminRegisterForm.value).subscribe({
      next: (res) => {
        console.log(adminRegisterForm.value);

        if (res.message === 'done') {
          this.isLoading = false;
          this._router.navigate([''])
        }
      },
      error: (err) => {
        console.log(adminRegisterForm.value);
        this.isLoading = false;
        console.log(err)
      }
    })
  }
}
