import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reservationConfirmationDialog',
  templateUrl: './reservationConfirmationDialog.component.html',
  styleUrls: ['./reservationConfirmationDialog.component.scss'],
})
export class ReservationConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      confirmationNumber: string;
      userId: string;
      reservationDate: string;
      timeSlotId: string;
    }
  ) {}
}
