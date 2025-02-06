import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';


@Injectable({
  providedIn: 'root',
})
export class DisabledTimeslotService {
  private baseUrl = 'http://localhost:8080/api/disabledTimeSlots';

  constructor(private http: HttpClient) {}

  getAllDisabledTimeSlots(): Observable<DisabledTimeslot[]> {
    return this.http.get<DisabledTimeslot[]>(`${this.baseUrl}`)
  }

  getDisabledTimeSlots(date: string): Observable<DisabledTimeslot[]> {
    return this.http.get<DisabledTimeslot[]>(`${this.baseUrl}/${date}`);
  }

  addDisabledTimeSlot(disabledTimeSlot: DisabledTimeslot): Observable<DisabledTimeslot> {
    return this.http.post<DisabledTimeslot>(this.baseUrl, disabledTimeSlot);
  }
}
