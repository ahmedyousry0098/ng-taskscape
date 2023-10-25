import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-org-regitser',
  templateUrl: './org-regitser.component.html',
  styleUrls: ['./org-regitser.component.css']
})
export class OrgRegitserComponent {
  constructor(private _authService: AuthService, private _router: Router) { }

  isLoading: boolean = false;
  orgRegisterForm: FormGroup = new FormGroup({
    organization_name: new FormControl(null, [Validators.required]),
    company: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    headQuarters: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    industry: new FormControl('software development'),
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    logo: new FormControl(null)
  })

  handleOrgRegister(orgRegisterForm: FormGroup) {
    this.isLoading = true;
    this._authService.orgRegister(this.orgRegisterForm.value).subscribe({
      next: (res) => {
        if (res.message === 'done') {
          this.isLoading = false;
          this._router.navigate(['/admin-register'])
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err)
      }
    })
  }

}
