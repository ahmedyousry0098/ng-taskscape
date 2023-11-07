import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IProject } from 'src/interfaces/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployeeResponse } from '../auth/interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  private photochange = new BehaviorSubject<boolean>(false);
  isPhotoChanged = this.photochange.asObservable();
  constructor(private HttpClient: HttpClient) {}

  changePassword(
    employeeId: string | null,
    password: string,
    newPassword: string
  ): Observable<IEmployeeResponse> {
    return this.HttpClient.patch<IEmployeeResponse>(
      `${this.baseUrl}/employee/changepassword/${employeeId}`,
      {
        newPassword,
        password,
      }
    );
  }

  addPhoto(employeeId: string | null, data: FormData): Observable<any> {
    return this.HttpClient.patch(
      `${this.baseUrl}/employee/update-photo/${employeeId}`,
      data
    );
  }

  changeFreshStatus(employeeId: string | null): Observable<any> {
    return this.HttpClient.patch(
      `${this.baseUrl}/employee/change-status/${employeeId}`,
      {}
    );
  }
  getEmployeeData(): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/employee/my-profile`, {});
  }
  changePhoto() {
    this.photochange.next(true);
  }

  getAllEmployeeInOrg(orgId: string): Observable<any> {
    return this.HttpClient.get(
      `${this.baseUrl}/employee/getAllEmployees/${orgId}`
    );
  }
}
