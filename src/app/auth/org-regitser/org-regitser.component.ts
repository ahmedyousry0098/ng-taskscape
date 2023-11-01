import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-org-regitser',
  templateUrl: './org-regitser.component.html',
  styleUrls: ['./org-regitser.component.css'],
})
export class OrgRegitserComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isLoading: boolean = false;
  orgRegisterForm: FormGroup = new FormGroup({
    organization_name: new FormControl('', [Validators.required]),
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    headQuarters: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    industry: new FormControl('software development'),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(300),
    ]),
    logo: new FormControl(''),
  });

  handleFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.orgRegisterForm.patchValue({ logo: files[0] });
    }
  }

  handleOrgRegister() {
    this.isLoading = true;
    const formData = new FormData();
    for (let key in this.orgRegisterForm.value) {
      formData.append(key, this.orgRegisterForm.value[key]);
    }
    this._AuthService.orgRegister(formData).subscribe({
      next: (res) => {
        localStorage.setItem(
          'org',
          JSON.stringify({
            orgId: res.organization._id,
            organization_name: res.organization.organization_name,
          })
        );
        this._Router.navigate(['/admin-register']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
