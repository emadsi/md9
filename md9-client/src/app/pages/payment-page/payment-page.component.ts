import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { IReservation, ReservationStatus } from '../../models/reservation/reservation.interface';

@Component({
    selector: 'app-payment-page',
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.scss',
    standalone: false
})
export class PaymentPageComponent implements OnInit {
    paymentMethod: string = '';
    reservationData: IReservation; // passed from ReservationFormComponent
    
    constructor(
      private route: ActivatedRoute,
      private paymentService: PaymentService,
      private reservationService: ReservationService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      const navigation = this.router.getCurrentNavigation();
      this.paymentMethod = this.route.snapshot.queryParamMap.get('paymentMethod') || 'Cash';
      this.reservationData = navigation?.extras?.state?.['reservationData']; // reservation passed from ReservationForm
    }

    onPaymentSuccess(): void {
      // Add confirmation number, timestamps, and update status
      const finalReservation: IReservation = {
        ...this.reservationData,
        confirmationNo: this.generateConfirmationNumber(),
        status: ReservationStatus.DONE,
        createdAt: new Date().toISOString()
      };
  
      this.reservationService.createReservation(finalReservation).subscribe({
        next: () => {
          alert('Reservation saved successfully!');
          this.router.navigate(['/']); // Redirect to homepage or confirmation
        },
        error: () => {
          alert('Failed to save reservation.');
        }
      });
    }
  
    private generateConfirmationNumber(): string {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
  
    handleSubmitPayment(formData: any): void {
      if (this.paymentMethod === 'Cash') {
        this.paymentService.holdWithObligo(formData).subscribe({
          next: () => this.onPaymentSuccess(),
          error: () => alert('Obligo hold failed.')
        });
      } else {
        this.paymentService.payWithCreditCard(formData).subscribe({
          next: () => this.onPaymentSuccess(),
          error: () => alert('Credit card payment failed.')
        });
      }
    }
}
