import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimeSlot } from '../../models/timeslot/timeslot.interface';
// import { TimeSlot } from '../../models/timeslot/timeslot.interface';



@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private baseUrl = 'http://localhost:8080/api/timeslots';

  constructor(private http: HttpClient) {}

  getAllTimeSlots(): Observable<ITimeSlot[]> {
    return this.http.get<ITimeSlot[]>(`${this.baseUrl}/all`);
  }

  addTimeSlot(from: string, to: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, { from, to });
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
