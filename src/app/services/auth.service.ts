import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://taskspace-rxco.onrender.com"

  constructor(private _httpclient: HttpClient) { }

  orgRegister(data: any): Observable<any> {
    return this._httpclient.post(`${this.baseUrl}/organization`, data)
  }
  
  adminRegister(data: any): Observable<any> {
    return this._httpclient.post(`${this.baseUrl}/admin/login`, data)
  }
}