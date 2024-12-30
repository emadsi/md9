import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReservation, ITimeSlot } from '../../models/reservation/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  /**
   * Create a new reservation
   * @param reservationData The reservation data
   * @returns Observable of the created reservation
   */
  createReservation(reservationData: IReservation): Observable<any> {
    return this.http.put<IReservation>(`${this.apiUrl}/new`, {reservationData});
  }

  // /**
  //  * Update an existing reservation
  //  * @param reservationId The ID of the reservation
  //  * @param updateData The updated reservation data
  //  * @returns Observable of the updated reservation
  //  */
  // updateReservation(reservationId: number, updateData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/new`, {reservationId}, updateData);
  // }

  /**
   * Cancel a reservation
   * @param confirmationNumber The confirmation number of the reservation
   * @returns Observable of the cancellation response
   */
  cancelReservation(confirmationNumber: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cancel/${confirmationNumber}`);
  }

  // /**
  //  * Fetch all time slots from the backend.
  //  * @returns Observable of time slots
  //  */
  // getTimeSlots(): Observable<ITimeSlot[]> {
  //   return this.http.get<ITimeSlot[]>(`${this.apiUrl}`);
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
  getReservationByConfirmationNumber(confirmationNumber: number): Observable<any> {
    const params = new HttpParams().set('confirmationNumber', confirmationNumber.toString());
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getAvailableTimeSlots(date: Date): Observable<string[]> {
    // Replace with actual API call
    // const formattedDate = date.toISOString().split('T')[0];
    return this.http.get<string[]>(`/api/reservations/available-slots/${date}`);
  }
}
