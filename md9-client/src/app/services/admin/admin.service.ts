import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAdmin } from '../../models/admin/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admins`
  
  constructor(private http: HttpClient) { }

  registerAdmin(newAdmin: IAdmin): Observable<String> {
    return this.http.post<String>(`${this.baseUrl}/register`, newAdmin).pipe(
      catchError(this.handleError)
    )
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
