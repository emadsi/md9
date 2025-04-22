import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DisabledTimeslotService {
  private baseUrl = `${environment.apiUrl}/disabledTimeslots`;

  constructor(private http: HttpClient) {}

  getAllDisabledTimeslots(): Observable<DisabledTimeslot[]> {
    return this.http.get<DisabledTimeslot[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching Booked Timeslots', error);
        return of([]); // Return empty array on failure
      })
    );
  }

  getDisabledTimeslots(date: string): Observable<DisabledTimeslot[]> {
    return this.http.get<DisabledTimeslot[]>(`${this.baseUrl}/date/${date}`).pipe(
      catchError((error) => {
        console.error(`Error fetching Booked Timeslots in this specific date: ${date}`, error);
        return of([]); // Return empty array on failure
      })
    );
  }

  addDisabledTimeslot(disabledTimeslot: DisabledTimeslot): Observable<DisabledTimeslot> {
    return this.http.post<DisabledTimeslot>(`${this.baseUrl}/add`, {disabledTimeslot}).pipe(
      catchError((error) => {
        console.error('Error adding Booked Timeslot', error);
        return of(null); // Return empty array on failure
      })
    );
  }
}
