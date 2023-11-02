import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = 'https://taskspace-rxco.onrender.com';
  token: any;
  employeeOrgId?: string;
  employeeId?: string;
  constructor(
    private HttpClient: HttpClient,
    private auth: AuthService,
    private route: ActivatedRoute
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
  getProjectDetails(id: any): Observable<any> {
    this.token = this.auth.getToken();
    return this.HttpClient.get<any>(`${this.baseUrl}/project/details/${id}`, {
      headers: {
        token: `${this.token}`,
      },
    });
  }
  addEmployee(data: any): Observable<any> {
    this.token = this.auth.getToken();
    return this.HttpClient.patch<any>(
      `${this.baseUrl}/project/add-employee`,
      data,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
  delEmployee(data: any): Observable<any> {
    this.token = this.auth.getToken();
    return this.HttpClient.patch<any>(
      `${this.baseUrl}/project/del-employee`,
      data,
      {
        headers: {
          token: `${this.token}`,
        },
      }
    );
  }
}
