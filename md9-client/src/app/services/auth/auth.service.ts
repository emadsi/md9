import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, Subscription, fromEvent, merge, timer, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IAdmin } from '../../models/admin/admin.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // Key to store the token
  private readonly ADMIN_ROLE_KEY = 'isSuperAdmin';
  private readonly ADMIN_DATA = 'adminData';
  private readonly SESSION_KEY = 'md9Session';

  private readonly INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes
  private inactivityTimer?: Subscription;
  private isBrowser: boolean;

  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(!!this.getAdmin());
  isAdminLoggedIn$ = this.isAdminLoggedInSubject.asObservable();
  
  private apiUrl = `${environment.apiUrl}/auth`; // Correct API endpoint

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.setupInactivityListener();
    }
  }

  /**
   * Login function - sends credentials to backend
   */
  login(username: string, password: string): Observable<{ token: string, isSuperAdmin: boolean, admin: IAdmin }> {
    return this.http.post<{ token: string, isSuperAdmin: boolean, admin: IAdmin }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        // ✅ Set sessionStorage key to indicate session active
        localStorage.setItem(this.TOKEN_KEY, response.token); // Use localStorage for security
        localStorage.setItem(this.ADMIN_ROLE_KEY, JSON.stringify(response.isSuperAdmin));
        localStorage.setItem(this.ADMIN_DATA, JSON.stringify(response.admin));
        sessionStorage.setItem(this.SESSION_KEY, 'active'); // ✅ Without this, isLoggedIn() may return false
        this.isAdminLoggedInSubject.next(true);
        this.resetInactivityTimer();
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
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.SESSION_KEY, 'active');
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.ADMIN_DATA, JSON.stringify(admin));
      this.resetInactivityTimer();
    }
  }

  // ✅ Everywhere you used `typeof window !== 'undefined'`, you can now use `this.isBrowser`
  isLoggedIn(): boolean {
    return this.isBrowser &&
      !!localStorage.getItem(this.TOKEN_KEY) &&
      sessionStorage.getItem(this.SESSION_KEY) === 'active';
  }

  /**
   * Logout function to clear token and redirect to login page
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ADMIN_ROLE_KEY);
      localStorage.removeItem(this.ADMIN_DATA);
      sessionStorage.removeItem(this.SESSION_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
      this.isAdminLoggedInSubject.next(false);
      
      // Optionally: clear all to be extra safe
      sessionStorage.clear();
      localStorage.clear();
    }

    if (this.inactivityTimer) this.inactivityTimer.unsubscribe();
  }

  /**
   * Get authentication token (for API requests)
   */
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  isSuperAdmin(): boolean {
    return typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(this.ADMIN_ROLE_KEY) || 'false')
      : false;
  }

  getAdmin(): IAdmin {
    return typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(this.ADMIN_DATA) || 'null')
      : null;
  }

  /**
   * Inactivity timeout setup
   */
  private setupInactivityListener(): void {
    if (!this.isBrowser) return;

    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    const allEvents$ = merge(...events.map(evt => fromEvent(document, evt)));

    allEvents$.subscribe(() => this.resetInactivityTimer());
    this.resetInactivityTimer();
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
    }

    this.inactivityTimer = timer(this.INACTIVITY_LIMIT_MS).subscribe(() => {
      this.logout();
      alert('You were logged out due to inactivity.');
    });
  }
}