import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisabledTimeSlot } from '../../models/disabledTimeSlot/disabledTimeSlots.interface';


@Injectable({
  providedIn: 'root',
})
export class DisabledTimeSlotService {
  private baseUrl = 'http://localhost:8080/api/disabledTimeSlots';

  constructor(private http: HttpClient) {}

  getAllDisabledTimeSlots(): Observable<DisabledTimeSlot[]> {
    return this.http.get<DisabledTimeSlot[]>(`${this.baseUrl}`)
  }

  getDisabledTimeSlots(date: string): Observable<DisabledTimeSlot[]> {
    return this.http.get<DisabledTimeSlot[]>(`${this.baseUrl}/${date}`);
  }

  addDisabledTimeSlot(disabledTimeSlot: DisabledTimeSlot): Observable<DisabledTimeSlot> {
    return this.http.post<DisabledTimeSlot>(this.baseUrl, disabledTimeSlot);
  }
}
