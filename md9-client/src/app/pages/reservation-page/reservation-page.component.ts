import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { IReservation, ReservationStatus } from '../../models/reservation/reservation.interface';
import { MatDialog } from '@angular/material/dialog';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationConfirmationDialogComponent } from '../../components/reservationConfirmationDialog/reservationConfirmationDialog.component';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component';

@Component({
    selector: 'app-reservation-page',
    templateUrl: './reservation-page.component.html',
    styleUrl: './reservation-page.component.scss',
    standalone: false
})
export class ReservationPageComponent implements OnInit {
  fieldId: string;
  timeslots: ITimeslot[] = [];
  disabledTimeslots: DisabledTimeslot[] = [];
  filteredTimeslots: ITimeslot[] = [];
  showPaymentForm: boolean = false;
  reservationData: IReservation | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  @ViewChild('reservationFormSection') reservationFormSection!: ElementRef;
  @ViewChild(ReservationFormComponent) reservationFormComponent!: ReservationFormComponent;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private timeslotService: TimeslotService,
    private disabledTimeslotService: DisabledTimeslotService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fieldId = this.route.snapshot.paramMap.get('fieldId');
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
    this.filteredTimeslots = this.timeslots.filter(slot => slot.fieldId === this.fieldId);
  }

  private loadDisabledTimeslots(): void {
    this.disabledTimeslotService.getAllDisabledTimeslots().subscribe({
      next: (data) => {
        this.disabledTimeslots = data;
        // this.filterDisabledTimeslots();
      },
      error: (error) => {
        console.error('Failed to Fetch DisabledTimeslots', error)
      }
    });
  }
  
  onProceedToPayment(reservation: IReservation) {
    this.reservationData = reservation;
    this.showPaymentForm = true;
    this.errorMessage = ''; // clear previous error if any
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
          this.successMessage = `Reservation confirmed! Confirmation No: ${savedReservation.confirmationNo}`;
          this.showPaymentForm = false;
          this.reservationData = null;
          this.errorMessage = ''; // Clear any previous error
          
          // ✅ Reset the form
        this.reservationFormComponent.resetForm();
        },
        error: (err) => {
          console.error('Error saving reservation:', err);
          this.errorMessage = 
            err?.error?.message 
            || err?.error?.error 
            || 'An unexpected error occurred while creating the reservation. Please try again.';
        }
      });
    }
  }

  onGoBack(): void {
    this.showPaymentForm = false;
    this.errorMessage = '';

    // Optional: Scroll smoothly back to the reservation form
    setTimeout(() => {
      this.reservationFormSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100); // short delay ensures the DOM has updated
  }
}