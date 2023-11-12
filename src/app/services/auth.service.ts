import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import {
  IAdminForm,
  IAdminResponse,
  IEmployeeResponse,
  IOrgForm,
  IOrgResponse,
  forgotPasswordForm,
  resetPasswordForm,
} from '../auth/interfaces/register.interface';

import { jwtDecode } from 'jwt-decode';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();

  private isFreshUserSubject = new BehaviorSubject<boolean>(false);
  isFreshUser$ = this.isFreshUserSubject.asObservable();

  constructor(
    private _httpclient: HttpClient,
    private employeeService: EmployeeService
  ) {
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
    window.location.reload();
    this.loggedIn.next(false);
  }

  forgotPassword(data: forgotPasswordForm): Observable<IEmployeeResponse> {
    return this._httpclient.patch<IEmployeeResponse>(
      `${this.baseUrl}/employee/forget-password`,
      data
    );
  }

  resetPassword(data: resetPasswordForm): Observable<IEmployeeResponse> {
    return this._httpclient.patch<IEmployeeResponse>(
      `${this.baseUrl}/employee/reset-password`,
      data
    );
  }
  isFresh() {
    this.employeeService.getEmployeeData().subscribe((res) => {
      const isFresh = res.employee.isFresh;
      this.isFreshUserSubject.next(isFresh);
    });
    return this.isFresh;
  }
}
