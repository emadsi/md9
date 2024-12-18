import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IReservation, ITimeSlot, ReservationStatus } from '../../models/reservation/reservation.interface';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  reservations: any[] = [];
  errorMessage: string = '';
  timeSlots: ITimeSlot[] = [];
  selectedDate: Date | null = null;
  availableSlots: string[] = [];

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
      this.createForm();
      this.loadReservations();
      this.fetchTimeSlots();
  }

  private createForm() {
    this.reservationForm = this.fb.group({
      reservationId: [''],
      reserveeName: ['', Validators.required],
      mobile: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: this.fb.group({
        id: ['', Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required]
      }),
      paymentMethod: ['', Validators.required],
      confirmationNo: [''],
      status: [ReservationStatus.pending]
    });
  }

  private loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load reservations';
        console.error(error);
      }
    });
  }

  private fetchTimeSlots(): void {
    this.reservationService.getTimeSlots().subscribe({
      next: (slots) => {
        this.timeSlots = slots;
      },
      error: (error) => {
        console.error('Failed to fetch time slots', error);
      },
    });
  }

  onDateChange() {
    if (this.selectedDate) {
      this.reservationService.getAvailableTimeSlots(this.selectedDate).subscribe((slots: string[]) => {
        this.availableSlots = slots;
      });
    }
  }

  proceedToPayment() {
    if (this.reservationForm.valid) {
      const reservationDetails = {
        date: this.selectedDate,
        ...this.reservationForm.value
      };
      // Navigate to PaymentPage with reservation details (implementation depends on routing setup)
      console.log('Reservation Details:', reservationDetails);
    }
  }

  submitReservation(): void {
    this.reservationService.createReservation(this.reservationForm.value).subscribe({
      next: (response) => {
        this.confirmationNo.setValue(response.confirmationNumber);
        alert(`Reservation successful! Confirmation Number: ${this.confirmationNo.value}`);
      },
      error: (error) => {
        console.error('Failed to create reservation', error);
        alert('Failed to create reservation');
      }
    });
  }

  get reservationId(): FormControl {
    return this.reservationForm.get('reservationId') as FormControl;
  }
  get reserveeName(): FormControl {
    return this.reservationForm.get('reserveeName') as FormControl;
  }
  get mobile(): FormControl {
    return this.reservationForm.get('mobile') as FormControl;
  }
  get date(): FormControl {
    return this.reservationForm.get('date') as FormControl;
  }
  get timeSlot(): FormGroup {
    return this.reservationForm.get('timeSlot') as FormGroup;
  }
  get paymentMethod(): FormControl {
    return this.reservationForm.get('paymentMethod') as FormControl;
  }
  get confirmationNo(): FormControl {
    return this.reservationForm.get('confirmationNo') as FormControl;
  }
  get status(): FormControl {
    return this.reservationForm.get('status') as FormControl;
  }

}
