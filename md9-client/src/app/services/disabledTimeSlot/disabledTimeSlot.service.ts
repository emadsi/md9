import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DisabledTimeslotService {
  private baseUrl = `${environment.apiUrl}/disabledTimeSlots'`;

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
