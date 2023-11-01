import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployee, IProject } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';
import { IEmployeeResponse } from '../auth/interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(
    private HttpClient: HttpClient,
    private _httpclient: HttpClient
  ) {}
  getAllUsers(): Observable<IProject> {
    return this.HttpClient.get<IProject>(
      `${this.baseUrl}/employee/getAllEmployeeScrum/653d3b8c509e0e7ff0e7746c`,
      {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNlMGQ1ZmExODUwMjNlZWUzZjVjMDMiLCJlbWFpbCI6ImF5YUBnbWFpbC5jb20iLCJyb2xlIjoic2NydW1NYXN0ZXIiLCJvcmdJZCI6IjY1M2QzYjhjNTA5ZTBlN2ZmMGU3NzQ2YyIsImlhdCI6MTY5ODU2NTUzNCwiZXhwIjoxNjk4NjUxOTM0fQ.JHOzdkvqsLhEhEBFzs1hhKT5YS5f-NSDk0SoNoCuzUY',
        },
      }
    );
  }
  createNewProject(formData: any): Observable<IProject> {
    return this.HttpClient.post<IProject>(
      `${this.baseUrl}/project/create`,
      formData,
      {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNlMGQ1ZmExODUwMjNlZWUzZjVjMDMiLCJlbWFpbCI6ImF5YUBnbWFpbC5jb20iLCJyb2xlIjoic2NydW1NYXN0ZXIiLCJvcmdJZCI6IjY1M2QzYjhjNTA5ZTBlN2ZmMGU3NzQ2YyIsImlhdCI6MTY5ODU2NTUzNCwiZXhwIjoxNjk4NjUxOTM0fQ.JHOzdkvqsLhEhEBFzs1hhKT5YS5f-NSDk0SoNoCuzUY',
        },
      }
    );
  }

  changePassword(
    employeeId: string | null,
    password: string,
    newPassword: string,
    headers: HttpHeaders
  ): Observable<IEmployeeResponse> {
    return this.HttpClient.patch<IEmployeeResponse>(
      `${this.baseUrl}/employee/changepassword/${employeeId}`,
      {
        newPassword,
        password,
      },
      { headers }
    );
  }

  addPhoto(
    employeeId: string | null,
    data: FormData,
    headers: HttpHeaders
  ): Observable<any> {
    return this.HttpClient.patch(
      `${this.baseUrl}/employee/update-photo/${employeeId}`,
      { data },
      { headers }
    );
  }

  changeFreshStatus(
    employeeId: string | null,
    headers: HttpHeaders
  ): Observable<any> {
    console.log('ok');
    return this.HttpClient.patch(
      `${this.baseUrl}/employee/change-status/${employeeId}`,
      {},
      { headers }
    );
  }
}
