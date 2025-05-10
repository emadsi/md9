import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiBaseUrl = `${environment.apiUrl}/payments`; // Update if using environment configs

  constructor(private http: HttpClient) {}

  /**
   * Calls the credit card payment endpoint
   * @param payload Credit card form data
   */
  payWithCreditCard(
    payload: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
        id: string;
        amount: number;
    }): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/credit`, payload);
  }

  /**
   * Calls Obligo API to hold a deposit
   * @param payload User and reservation data
   */
  holdWithObligo(
    payload: {
        reserverName: string;
        mobile: string;
        amount: number;
    }): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/obligo`, payload);
  }
}