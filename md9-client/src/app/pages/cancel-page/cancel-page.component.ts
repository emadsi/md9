import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Form, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.scss']
})
export class CancelPageComponent implements OnInit {
  confirmationNumber: FormControl;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.confirmationNumber = this.fb.control(0);
  }

  cancelReservation(): void {
    this.reservationService.cancelReservation(this.confirmationNumber.value).subscribe({
      next: () => {
        alert('Reservation cancelled successfully!');
      },
      error: (error) => {
        console.error('Failed to cancel reservation', error);
        alert('Failed to cancel reservation');
      }
    });
  }
}
