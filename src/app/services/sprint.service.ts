import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  baseUrl = 'https://taskspace-rxco.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  createSprint(projectId: string | null, data: FormData): Observable<any> {
    return this.HttpClient.post(
      `${this.baseUrl}/sprint/create/${projectId}`,
      data
    );
  }

  getSprints(projectId: string | null): Observable<any> {
    return this.HttpClient.get(`${this.baseUrl}/sprint/${projectId}`);
  }
}
