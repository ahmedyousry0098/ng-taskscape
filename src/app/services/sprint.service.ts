import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  createSprint(
    projectId: string | null,
    sprint_name: string | null,
    start_date: Date | null,
    deadline: Date | null
  ): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/sprint/create/${projectId}`, {
      sprint_name,
      start_date,
      deadline,
    });
  }

  getSprints(projectId: string | null): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/sprint/${projectId}`);
  }

  getScrumProjects(orgId: string | null): Observable<any> {
    return this.HttpClient.get(
      `${this.baseUrl}/project/scrum-projects/${orgId}`
    );
  }
  getEmployeeProject(orgId: string | null): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/project/emp-projects/${orgId}`);
  }

  getSprintDetails(sptintId: string): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/sprint/details/${sptintId}`);
  }
}
