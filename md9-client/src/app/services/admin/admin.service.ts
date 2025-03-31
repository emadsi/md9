import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IAdmin } from '../../models/admin/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admins`
  
  constructor(private http: HttpClient) { }

  registerAdmin(newAdmin: IAdmin): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, // ✅ Include JWT token
      'Content-Type': 'application/json'
    });
  
    return this.http.post<string>(`${this.baseUrl}/register`, newAdmin, { headers }).pipe(
      catchError(this.handleError)
    );
  }  

  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, admin);
  }

  changePassword(passwordData: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/change-password`, passwordData);
  }

  forgotPassword(username: string, email: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/forgot-password`, { username, email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  unlockDeposit(reservationId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/unlock-deposit/${reservationId}`, {});
  }

  /**
   * Handle errors from API requests
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(() => new Error('Admin already exists!'));
    } else if (error.status === 403) {
      return throwError(() => new Error('Access denied! Only Super Admins can register new admins.'));
    } else {
      return throwError(() => new Error('An error occurred while processing the request. Please try again later.'));
    }
  }
}
