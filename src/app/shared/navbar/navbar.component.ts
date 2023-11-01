import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedIn: boolean = false;
  employeeName: string = '';
  token: string = '';
  imageUrl: string = '../../../assets/noavatar.jpg';
  photoChanged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.loadEmployeePhoto();
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        const decodedToken = this.authService.getDecodedToken();
        if (decodedToken && decodedToken.email) {
          this.employeeName = decodedToken.email;
        }
      }
    });
  }
  ngOnInit() {
    this.employeeService.isPhotoChanged.subscribe((changed) => {
      this.photoChanged = changed;
      if (changed) {
        this.loadEmployeePhoto();
      }
    });
  }

  loadEmployeePhoto() {
    this.employeeService.getEmployeeData().subscribe({
      next: (res) => {
        this.imageUrl = res.employee.profile_photo.secure_url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
