import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IReservation, ReservationStatus } from '../../models/reservation/reservation.interface';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrl: './payment-form.component.scss',
    standalone: false
})
export class PaymentFormComponent {
  @Input() paymentMethod: string | null = null;
  @Input() reservationData!: IReservation;
  @Output() paymentSuccess = new EventEmitter<string>(); // Emit confirmationNo

  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      id: ['', Validators.required],
      amount: [{ value: '340 ILS', disabled: true }, Validators.required]
    });
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    if (!this.reservationData) {
      console.error('Missing reservation data');
      return;
    }

    const simulateApi = new Promise<string>((resolve) => {
      setTimeout(() => {
        const confirmationNo = this.paymentMethod === 'Cash'
          ? 'OBLIGO-' + Math.floor(Math.random() * 10000)
          : 'CARD-' + Math.floor(Math.random() * 10000);
        resolve(confirmationNo);
      }, 1000);
    });

    simulateApi.then((confirmationNo) => {
      const completedReservation: IReservation = {
        ...this.reservationData,
        confirmationNo,
        status: ReservationStatus.DONE,
        createdAt: new Date().toISOString()
      };

      this.reservationService.createReservation(completedReservation).subscribe({
        next: () => {
          alert('✅ Payment successful & reservation saved!');
          this.paymentSuccess.emit(confirmationNo); // Notify parent
        },
        error: (err) => {
          console.error('❌ Failed to save reservation', err);
          alert('Reservation save failed after payment');
        }
      });
    });
  }
}