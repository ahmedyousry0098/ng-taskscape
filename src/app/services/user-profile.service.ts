import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee, IProject } from 'src/interfaces/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  baseUrl = 'https://taskspace-rxco.onrender.com';
  loggedIn: boolean = false;
  token: any;
  constructor(private HttpClient: HttpClient, private auth: AuthService) {}
  getUserProfile(): Observable<any> {
    this.token = this.auth.getToken();

    return this.HttpClient.get<any>(`${this.baseUrl}/employee/my-profile`, {
      headers: {
        token: `${this.token}`,
      },
    });
  }
}
