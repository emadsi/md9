import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admin/login'; // Adjust API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('adminToken', response.token);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  logout(): void {
    localStorage.removeItem('adminToken');
  }
}
