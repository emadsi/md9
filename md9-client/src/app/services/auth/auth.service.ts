import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // Key to store the token
  private apiUrl = `${environment.apiUrl}/auth/login`; // Correct API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login function - sends credentials to backend
   */
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        sessionStorage.setItem(this.TOKEN_KEY, response.token); // Use sessionStorage for security
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An unknown error occurred!';
        if (error.status === 401) {
          errorMsg = 'Invalid username or password.';
        } else if (error.status === 500) {
          errorMsg = 'Server error. Please try again later.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Check if user is logged in by verifying if a token exists
   */
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Logout function to clear token and redirect to login page
   */
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Get authentication token (for API requests)
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}