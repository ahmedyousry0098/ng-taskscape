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
      'https://taskspace-rxco.onrender.com/employee/getAllEmployee/6536dae94ed51dcf83f8faf5',
      {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2ZTBmNDEyZjJlYmYyOTQwNDkyN2UiLCJlbWFpbCI6ImFobWVkeW91c3J5MDk4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODM0ODQ1MywiZXhwIjoxNjk4NDM0ODUzfQ.kxddv_MqeHCdXzadnLwW_Ke_XDviP0NyL3-aMpO1ObI',
        },
      }
    );
  }
}
