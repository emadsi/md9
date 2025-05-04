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
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-reservation-page',
    templateUrl: './reservation-page.component.html',
    styleUrl: './reservation-page.component.scss',
    standalone: false
})
export class ReservationPageComponent implements OnInit {
  fieldId: number;
  timeslots: ITimeslot[] = [];
  disabledTimeslots: DisabledTimeslot[] = [];
  filteredTimeslots: ITimeslot[] = [];
  // filteredDisabledTimeslots: DisabledTimeslot[] = [];
  disabledTimeslotIds: string[] = [];
  // reservations: any[] = [];
  errorMessage: string = '';
  selectedTimeslotId = '';
  fields = ['Field 1', 'Field 2'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private timeslotService: TimeslotService,
    private disabledTimeslotService: DisabledTimeslotService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.fieldId = Number(this.route.snapshot.paramMap.get('fieldId'));
      // this.loadReservations();
      this.fetchTimeslots();
      this.loadDisabledTimeslots();
  }

  private fetchTimeslots(): void {
    this.timeslotService.getAllTimeslots().subscribe({
      next: (slots) => {
        this.timeslots = slots;
        this.filterTimeslots();
      },
      error: (error) => {
        console.error('Failed to fetch timeslots', error);
      },
    });
  }

  private filterTimeslots(): void {
    this.filteredTimeslots = this.timeslots.filter(slot => slot.fieldId === this.fieldId.toString());
  }


  private loadDisabledTimeslots(): void {
    this.disabledTimeslotService.getAllDisabledTimeslots().subscribe({
      next: (data) => {
        this.disabledTimeslots = data;
        this.filterDisabledTimeslots();
      },
      error: (error) => {
        console.error('Failed to Fetch DisabledTimeslots', error)
      }
    });
  }

  private filterDisabledTimeslots(): void {
    this.disabledTimeslotIds = this.disabledTimeslots
      .filter(d => d.fieldId === this.fieldId.toString())
      .map(slot => slot.timeslotId);
  }

  // reserveTimeslot(reservation: IReservation): void {
  //   if (reservation) {
  //     this.reservationService
  //         .createReservation(reservation)
  //         .subscribe((response: IReservation) => {
  //             this.openConfirmationDialog(response);
  //             alert('Reservation successful!')});
  //   }
  // }

  onProceedToPayment(reservation: IReservation) {
    if (reservation) {
      const paymentMethod = reservation.paymentMethod;
      this.router.navigate(['/payment'], {
        state: { paymentMethod }
      });
    }
  }

  // private openConfirmationDialog(reservation: IReservation): void {
  //   this.dialog.open(ReservationConfirmationDialogComponent, {
  //     data: reservation,
  //   });
  // }
}
