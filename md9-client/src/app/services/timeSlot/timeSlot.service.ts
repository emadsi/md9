import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';
import { environment } from '../../../environments/environment';
// import { Timeslot } from '../../models/timeslot/timeslot.interface';



@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private baseUrl = `${environment.apiUrl}/timeslots`;

  constructor(private http: HttpClient) {}

  getAllTimeslots(): Observable<ITimeslot[]> {
    return this.http.get<ITimeslot[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching reservations', error);
        return of([]); // Return empty array on failure
      })
    );
  }

  addTimeslot(from: string, to: string, fieldId: string): Observable<ITimeslot> {
    return this.http.post<ITimeslot>(`${this.baseUrl}/add`, { from, to, fieldId });
  }

  blockTimeslot(timeslotId: string, date: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block`, { timeslotId, date });
  }

  unblockTimeslot(timeslotId: string, date: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/unblock`, { timeslotId, date});
  }

  blockAllTimeslots(date: Date): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block-all`, { date });
  }

  deleteTimeslot(timeslotId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, {timeslotId});
  }
}
