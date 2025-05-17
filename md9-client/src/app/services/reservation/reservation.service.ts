import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IReservation } from '../../models/reservation/reservation.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservations`; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  /**
   * Create a new reservation
   * @param reservationData The reservation data
   * @returns Observable of the created reservation
   */
  createReservation(reservationData: IReservation): Observable<IReservation> {
    return this.http.post<IReservation>(`${this.apiUrl}/create`, reservationData).pipe(
      catchError((error) => {
        console.error('Error fetching reservations', error);
        return throwError(() => error); // Return empty array on failure
      })
    );
  }

  /**
   * Cancel a reservation
   * @param confirmationNumber The confirmation number of the reservation
   * @returns Observable of the cancellation response
   */
  cancelReservation(confirmationNumber: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.apiUrl}/cancel/${confirmationNumber}`);
  }

  /**
   * Get all reservations
   * @returns Observable of reservation list
   */
  getAllReservations(): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(`${this.apiUrl}/all`);
  }

  /**
   * Get reservation by confirmation number
   * @param confirmationNumber The confirmation number
   * @returns Observable of the reservation
   */
  getReservationByConfirmationNumber(confirmationNumber: string): Observable<any> {
    const params = new HttpParams().set('confirmationNumber', confirmationNumber.toString());
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }
}