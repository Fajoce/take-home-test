import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

   private apiUrl = 'http://localhost:5000/loan';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }
}
