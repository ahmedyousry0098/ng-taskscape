import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedIn: boolean = false;
  employeeName: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userProfile: UserProfileService
  ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.userProfile.getUserProfile().subscribe(({ employee }) => {
          this.employeeName = employee.employeeName;
        });
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
