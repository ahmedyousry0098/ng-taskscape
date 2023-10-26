import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminForm, IAdminResponse, IOrgForm, IOrgResponse } from '../auth/interfaces/register.interface';
import { IOrganization } from 'src/interfaces/organization.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://taskspace-rxco.onrender.com"

  constructor(private _httpclient: HttpClient) { }

  orgRegister(data: FormData): Observable<IOrgResponse> {
    return this._httpclient.post<IOrgResponse>(`${this.baseUrl}/organization`, data)
  }
  
  adminRegister(data: IAdminForm): Observable<IAdminResponse> {
    return this._httpclient.post<IAdminResponse>(`${this.baseUrl}/admin/register`, data)
  }
}