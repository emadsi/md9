// confirm-payments.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-payments',
  templateUrl: './confirm-payments.component.html',
  styleUrls: ['./confirm-payments.component.scss'],
  standalone: false
})
export class ConfirmPaymentsComponent {
  reservationNumber: string = '';

  constructor(private http: HttpClient) {}

  confirmPayment() {
    this.http
      .post('/api/payments/confirm', { reservationNumber: this.reservationNumber })
      .subscribe(() => {
        alert('Payment confirmed successfully.');
      });
  }

  deductPayment() {
    this.http
      .post('/api/payments/deduct', { reservationNumber: this.reservationNumber })
      .subscribe(() => {
        alert('Payment deducted successfully.');
      });
  }
}
