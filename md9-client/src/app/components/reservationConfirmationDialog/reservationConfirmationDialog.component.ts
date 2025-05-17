import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { IReservation } from '../../models/reservation/reservation.interface';

@Component({
  selector: 'app-reservationConfirmationDialog',
  templateUrl: './reservationConfirmationDialog.component.html',
  styleUrls: ['./reservationConfirmationDialog.component.scss'],
})
export class ReservationConfirmationDialogComponent implements OnInit {
  timeslotRange = '';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public reservation: IReservation,
    private timeslotService: TimeslotService
  ) {}

  ngOnInit(): void {
    this.timeslotService.getTimeslotById(this.reservation.timeslotId).subscribe(slot => {
      if (slot) {
        this.timeslotRange = `${slot.startTime} - ${slot.endTime}`;
      }
    });
  }
}
