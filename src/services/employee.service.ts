import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IProject } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private HttpClient: HttpClient) {}
  getAllUsers(): Observable<IProject> {
    return this.HttpClient.get<IProject>(
      'https://taskspace-rxco.onrender.com/employee/getAllEmployeeScrum/653d3b8c509e0e7ff0e7746c',
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
      'https://taskspace-rxco.onrender.com/project/create',
      formData,
      {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNlMGQ1ZmExODUwMjNlZWUzZjVjMDMiLCJlbWFpbCI6ImF5YUBnbWFpbC5jb20iLCJyb2xlIjoic2NydW1NYXN0ZXIiLCJvcmdJZCI6IjY1M2QzYjhjNTA5ZTBlN2ZmMGU3NzQ2YyIsImlhdCI6MTY5ODU2NTUzNCwiZXhwIjoxNjk4NjUxOTM0fQ.JHOzdkvqsLhEhEBFzs1hhKT5YS5f-NSDk0SoNoCuzUY',
        },
      }
    );
  }
}
