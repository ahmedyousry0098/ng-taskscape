import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

interface IStorageOrg {
  orgId: string;
  organization_name: string
}

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  constructor(private _authService: AuthService, private _router: Router, private toasterService: ToasterService) { }

  orgId?: string = ''
  organization_name?: string = ''

  ngOnInit() {
    this.getOrg()
  }

  registerError(){
    this.toasterService.error('You havn\'t entered data correctly')
  }

  isLoading: boolean = false;
  adminRegisterForm: FormGroup = new FormGroup({
    adminName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  handleOAdminRegister(adminRegisterForm: FormGroup) {
    this.isLoading = true;
    const data = {...this.adminRegisterForm.value, organization: this.orgId}
    this._authService.adminRegister(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._router.navigate([''])
      },
      error: (err) => {
        this.isLoading = false;
        this.toasterService.error('You havn\'t entered data correctly')
      }
    })
  }

  getOrg(): IStorageOrg | undefined {
    const organization: IStorageOrg = JSON.parse(localStorage.getItem('org') || "")
    if (!organization?.orgId) {
      this.isLoading = false
      return
    }
    this.orgId = organization.orgId
    this.organization_name = organization.organization_name
    return organization
  }

  ngOnDestroy() {
    localStorage.removeItem('org')
  }
}
