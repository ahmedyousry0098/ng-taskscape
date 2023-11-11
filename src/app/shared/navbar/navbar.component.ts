import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IoService } from 'src/app/services/io.service';
import { INotification } from 'src/interfaces/notification.interface';

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
  visible: boolean = false;
  notifications: INotification[] | null = null;

  position: any;

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
    this._IoService.readNotifications()
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService,
    private _IoService: IoService
  ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.loadEmployeePhoto();
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
    this._IoService.getNotifications().subscribe((notifications => {
      console.log(notifications);
      
      this.notifications = notifications
    }))
  }

  loadEmployeePhoto() {
    this.employeeService.getEmployeeData().subscribe({
      next: (res) => {
        this.employeeName = res.employee.employeeName;
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
