import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent {
  constructor(private _authService: AuthService, private _router: Router) { }

  isLoading: boolean = false;
  employeeLoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  handleEmployeeLogin(employeeLoginForm: FormGroup) {
    this.isLoading = true;
    const data = {...this.employeeLoginForm.value}
    this._authService.employeeLogin(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._router.navigate([''])
      },
      error: (err) => {
        console.log(employeeLoginForm.value);
        this.isLoading = false;
        console.log(err)
      }
  })
}
}