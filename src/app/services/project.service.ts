import { UserProfileService } from 'src/app/services/user-profile.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IProject } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'https://taskspace-rxco.onrender.com';
  token: any;
  employeeOrgId?: string;
  employeeId?: string;
  constructor(
    private HttpClient: HttpClient,
    private auth: AuthService,
    private userProfile: UserProfileService
  ) {}

  getAllUsers(): Observable<IProject> {
    this.token = this.auth.getToken();
    this.employeeOrgId = this.auth.getDecodedToken().orgId;
    return this.HttpClient.get<IProject>(
      `${this.baseUrl}/employee/getAllEmployees/${this.employeeOrgId}`,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
  createNewProject(formData: any): Observable<IProject> {
    this.token = this.auth.getToken();

    return this.HttpClient.post<IProject>(
      `${this.baseUrl}/project/create`,
      formData,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
  getAllProjectsScrum(): Observable<any> {
    this.token = this.auth.getToken();
    this.employeeId = this.auth.getDecodedToken()._id;
    return this.HttpClient.get<any>(
      `${this.baseUrl}/project/scrum-projects/${this.employeeId}`,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
  getAllProjectsEmployee(): Observable<any> {
    this.token = this.auth.getToken();
    this.employeeId = this.auth.getDecodedToken()._id;
    return this.HttpClient.get<any>(
      `${this.baseUrl}/project/emp-projects/${this.employeeId}`,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
}
