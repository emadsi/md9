import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IAdmin } from '../../models/admin/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // Key to store the token
  private readonly ADMIN_ROLE_KEY = 'isSuperAdmin';
  private readonly ADMIN_DATA = 'adminData';
  private apiUrl = `${environment.apiUrl}/auth`; // Correct API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login function - sends credentials to backend
   */
  login(username: string, password: string): Observable<{ token: string, isSuperAdmin: boolean, admin: IAdmin }> {
    return this.http.post<{ token: string, isSuperAdmin: boolean, admin: IAdmin }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token); // Use localStorage for security
        localStorage.setItem(this.ADMIN_ROLE_KEY, JSON.stringify(response.isSuperAdmin));
        localStorage.setItem(this.ADMIN_DATA, JSON.stringify(response.admin));
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

  saveSessionData(token: string, admin: IAdmin) {
    if (typeof window !== 'undefined') {  // ✅ Ensure it's running in the browser
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.ADMIN_DATA, JSON.stringify(admin));
    }
  }

  /**
   * Check if user is logged in by verifying if a token exists
   */
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false; // ✅ Prevent error in SSR
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Logout function to clear token and redirect to login page
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ADMIN_DATA);
    }
    this.router.navigate(['/']);
  }

  /**
   * Get authentication token (for API requests)
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isSuperAdmin(): boolean {
    if (typeof window === 'undefined') return false; // ✅ Prevent error in SSR
    return JSON.parse(localStorage.getItem(this.ADMIN_ROLE_KEY) || 'false');
  }

  getAdmin(): IAdmin {
    if (typeof window === 'undefined') return null; // ✅ Prevent error in SSR
    return JSON.parse(localStorage.getItem(this.ADMIN_DATA) || null);
  }
}