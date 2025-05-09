import { Component, OnInit } from '@angular/core';

import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { IReservation, ReservationStatus } from '../../models/reservation/reservation.interface';
import { MatDialog } from '@angular/material/dialog';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ReservationConfirmationDialogComponent } from '../../components/reservationConfirmationDialog/reservationConfirmationDialog.component';

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
  disabledTimeslotIds: string[] = [];
  showPaymentForm: boolean = false;
  reservationData: IReservation | null = null;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private timeslotService: TimeslotService,
    private disabledTimeslotService: DisabledTimeslotService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fieldId = Number(this.route.snapshot.paramMap.get('fieldId'));
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

  onProceedToPayment(reservation: IReservation) {
    this.reservationData = reservation;
    this.showPaymentForm = true;
  }

  onPaymentSuccess(confirmationNo: string) {
    if (this.reservationData) {
      const completedReservation = {
        ...this.reservationData,
        confirmationNo,
        createdAt: new Date().toISOString(),
        status: ReservationStatus.DONE,
      };

      this.reservationService.createReservation(completedReservation).subscribe({
        next: (savedReservation) => {
          this.dialog.open(ReservationConfirmationDialogComponent, {
            data: savedReservation,
          });
          this.showPaymentForm = false;
          this.reservationData = null;
        },
        error: (err) => {
          console.error('Error saving reservation:', err);
        }
      });
    }
  }
}