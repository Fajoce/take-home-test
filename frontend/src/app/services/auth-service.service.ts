import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private api =
    'http://localhost:5000/auth/login';

  constructor(
    private http: HttpClient
  ) {}

  login(request: LoginRequest) {

    return this.http.post<any>(
      this.api,
      request
    );
  }
}
