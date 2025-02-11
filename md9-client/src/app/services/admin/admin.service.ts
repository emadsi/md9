import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admins`
  
  constructor(private http: HttpClient) { }

  unlockDeposit(reservationId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/unlock-deposit/${reservationId}`, {});
  }
}
