import { UserProfileService } from './../../services/user-profile.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.css'],
})
export class WorkspaceHomeComponent {
  openTab = 1;
  loggedIn: boolean = false;
  employeeName: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private userProfile: UserProfileService
  ) {}
  //tasks taps switching
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }
  //check if login
  isUserLoggedIn() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.userProfile.getUserProfile().subscribe(({ employee }) => {
          this.employeeName = employee.employeeName;
        });
      }
    });
  }
  ngOnInit() {
    this.isUserLoggedIn();
  }
}
