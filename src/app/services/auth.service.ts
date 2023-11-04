import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IAdminForm,
  IAdminResponse,
  IEmployeeResponse,
  IOrgForm,
  IOrgResponse,
} from '../auth/interfaces/register.interface';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();

  constructor(private _httpclient: HttpClient) {
    this.checkLoggedIn();
  }

  orgRegister(data: FormData): Observable<IOrgResponse> {
    return this._httpclient.post<IOrgResponse>(
      `${this.baseUrl}/organization`,
      data
    );
  }

  adminRegister(data: IAdminForm): Observable<IAdminResponse> {
    return this._httpclient.post<IAdminResponse>(
      `${this.baseUrl}/admin/register`,
      data
    );
  }

  employeeLogin(data: IAdminForm): Observable<IEmployeeResponse> {
    return this._httpclient.post<IEmployeeResponse>(
      `${this.baseUrl}/employee/login`,
      data
    );
  }
  setLoggedIn(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.getDecodedToken();
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
    }
    return false;
  }

  checkLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken._id) {
        return decodedToken._id;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
