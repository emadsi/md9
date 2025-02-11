import { Component, OnInit } from '@angular/core';

import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { IReservation } from '../../models/reservation/reservation.interface';
import { ConfirmationNumberComponent } from '../../components/confirmation-number/confirmation-number.component';
import { ReservationConfirmationDialogComponent } from '../../components/reservationConfirmationDialog/reservationConfirmationDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';

@Component({
    selector: 'app-reservation-page',
    templateUrl: './reservation-page.component.html',
    styleUrl: './reservation-page.component.scss',
    standalone: false
})
export class ReservationPageComponent implements OnInit {
    timeslots: ITimeslot[] = [];
    disabledTimeslots: DisabledTimeslot[] = [];
    reservations: any[] = [];
    errorMessage: string = '';
    selectedTimeslotId = '';
    fields = ['Field 1', 'Field 2'];

    constructor(
        private reservationService: ReservationService,
        private timeslotService: TimeslotService,
        private disabledTimeslotService: DisabledTimeslotService,
        private  dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadReservations();
        this.fetchTimeslots();
        this.loadDisabledTimeslots();
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

    private fetchTimeslots(): void {
        this.timeslotService.getAllTimeslots().subscribe({
          next: (slots) => {
            this.timeslots = slots;
          },
          error: (error) => {
            console.error('Failed to fetch timeslots', error);
          },
        });
      }


    loadDisabledTimeslots(): void {
        this.disabledTimeslotService.getAllDisabledTimeslots().subscribe((data) => {
            this.disabledTimeslots = data;
          });
    }

    reserveTimeslot(reservation: IReservation): void {
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
