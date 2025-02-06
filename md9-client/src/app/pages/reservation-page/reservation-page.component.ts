import { Component, OnInit } from '@angular/core';

import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeSlotService } from '../../services/timeSlot/timeSlot.service';
import { IReservation } from '../../models/reservation/reservation.interface';
import { ConfirmationNumberComponent } from '../../components/confirmation-number/confirmation-number.component';
import { ReservationConfirmationDialogComponent } from '../../components/reservationConfirmationDialog/reservationConfirmationDialog.component';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { MatDialog } from '@angular/material/dialog';
import { ITimeSlot } from '../../models/timeslot/timeslot.interface';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';

@Component({
    selector: 'app-reservation-page',
    templateUrl: './reservation-page.component.html',
    styleUrl: './reservation-page.component.scss',
    standalone: false
})
export class ReservationPageComponent implements OnInit {
    timeSlots: ITimeSlot[] = [];
    disabledTimeSlots: DisabledTimeslot[] = [];
    reservations: any[] = [];
    errorMessage: string = '';
    selectedTimeSlotId = '';
    fields = ['Field 1', 'Field 2'];

    constructor(
        private reservationService: ReservationService,
        private timeSlotService: TimeSlotService,
        private disabledTimeslotService: DisabledTimeslotService,
        private  dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadReservations();
        this.fetchTimeSlots();
        this.loadDisabledTimeSlots();
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
        this.timeSlotService.getAllTimeSlots().subscribe({
          next: (slots) => {
            this.timeSlots = slots;
          },
          error: (error) => {
            console.error('Failed to fetch time slots', error);
          },
        });
      }


    loadDisabledTimeSlots(): void {
        this.disabledTimeslotService.getAllDisabledTimeSlots().subscribe((data) => {
            this.disabledTimeSlots = data;
          });
    }

    reserveTimeSlot(reservation: IReservation): void {
        if (reservation) {
        this.reservationService
            .createReservation(reservation)
            .subscribe((response: IReservation) => {
                this.openConfirmationDialog(response);
                alert('Reservation successful!')});
        }
    }

    private openConfirmationDialog(reservation: IReservation): void {
        this.dialog.open(ReservationConfirmationDialogComponent, {
          data: reservation,
        });
      }
}
