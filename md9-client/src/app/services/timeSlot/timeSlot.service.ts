import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ITimeSlot } from '../../models/timeslot/timeslot.interface';
import { environment } from '../../../environments/environment';
// import { TimeSlot } from '../../models/timeslot/timeslot.interface';



@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private baseUrl = `${environment.apiUrl}/timeslots'`;

  constructor(private http: HttpClient) {}

  getAllTimeSlots(): Observable<ITimeSlot[]> {
    return this.http.get<ITimeSlot[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching reservations', error);
        return of([]); // Return empty array on failure
      })
    );
  }

  addTimeSlot(from: string, to: string, fieldId: string): Observable<ITimeSlot> {
    return this.http.post<void>(`${this.baseUrl}/add`, { from, to, fieldId });
  }

  blockTimeSlot(timeSlotId: number, date: Date): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block`, { timeSlotId, date });
  }

  blockAllTimeSlots(date: Date): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block-all`, { date });
  }

  deleteTimeSlot(timeSlotId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, {timeSlotId});
  }
}
