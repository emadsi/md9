import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSlot } from '../../models/timeslot/timeslot.interface';


@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  private baseUrl = 'http://localhost:8080/api/time-slots';

  constructor(private http: HttpClient) {}

  getAllTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(`${this.baseUrl}/all`);
  }

  addTimeSlot(from: string, to: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, { from, to });
  }

  blockTimeSlot(timeSlotId: string, date: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block`, { timeSlotId, date });
  }

  blockAllTimeSlots(date: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/block-all`, { date });
  }

  deleteTimeSlot(timeSlotId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, {timeSlotId});
  }
}
