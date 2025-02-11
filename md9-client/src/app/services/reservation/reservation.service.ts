import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
    return this.http.put<IReservation>(`${this.apiUrl}/new`, {reservationData}).pipe(
      catchError((error) => {
        console.error('Error fetching reservations', error);
        return of(); // Return empty array on failure
      })
    );
  }

  // /**
  //  * Update an existing reservation
  //  * @param reservationId The ID of the reservation
  //  * @param updateData The updated reservation data
  //  * @returns Observable of the updated reservation
  //  */
  // updateReservation(reservationId: string, updateData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/new`, {reservationId}, updateData);
  // }

  /**
   * Cancel a reservation
   * @param confirmationNumber The confirmation number of the reservation
   * @returns Observable of the cancellation response
   */
  cancelReservation(confirmationNumber: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.apiUrl}/cancel/${confirmationNumber}`);
  }

  // /**
  //  * Fetch all time slots from the backend.
  //  * @returns Observable of time slots
  //  */
  // getTimeslots(): Observable<ITimeslot[]> {
  //   return this.http.get<ITimeslot[]>(`${this.apiUrl}`);
  // }

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

  // getAvailableTimeslots(date: Date): Observable<string[]> {
  //   // Replace with actual API call
  //   // const formattedDate = date.toISOString().split('T')[0];
  //   return this.http.get<string[]>(`/api/reservations/available-slots/${date}`);
  // }
}
