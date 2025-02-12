import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // Key to store the token in localStorage
  private apiUrl = `${environment.apiUrl}/admins/login`;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login function - sends credentials to backend
   */
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      })
    );
  }

  /**
   * Check if user is logged in by verifying if a token exists
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Logout function to clear token and redirect to login page
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/']);
  }

  /**
   * Get authentication token (if needed for API requests)
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

