import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedIn: boolean = false;
  employeeName: string = '';
  token: string = '';

  constructor(private authService: AuthService, private router: Router) {
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
