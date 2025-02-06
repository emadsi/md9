import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IReservation } from '../../models/reservation/reservation.interface';
// import { TimeSlotService } from '../../services/timeSlot/timeSlot.service';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { ReservationFormService } from '../../services/reservation-form/reservation-form.service';
import { ITimeSlot } from '../../models/timeslot/timeslot.interface';

@Component({
    selector: 'app-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrl: './reservation-form.component.scss',
    standalone: false
})
export class ReservationFormComponent implements OnInit {
  @Input() timeSlots: ITimeSlot[] = [];
  @Input() fields: string[] = [];
  @Output() reserveTimeSlot = new EventEmitter<IReservation>;

  reservationForm: FormGroup;
  // reservations: any[] = [];
  errorMessage: string = '';
  // timeSlots: ITimeSlot[] = [];
  selectedDate: Date | null = null;
  availableSlots: string[] = [];
  disabledTimeSlots: DisabledTimeslot[] = [];
  

  constructor(private fb: FormBuilder, 
    private reservationFormService: ReservationFormService, private disabledTimeslotService: DisabledTimeslotService) {}

  ngOnInit(): void {
      this.createForm();
  }

  private createForm() {
    this.reservationForm = this.reservationFormService.createReservationForm();
  }

  onDateChange(date: Date): void {
    this.disabledTimeslotService.getDisabledTimeSlots(date.toString()).subscribe((data) => {
      this.disabledTimeSlots = data;
    });
  }

  isTimeSlotDisabled(timeSlotId: String): boolean {
    return this.disabledTimeSlots.some((slot) => slot.timeSlotId === timeSlotId);
  }

  submitReservation(): void {
    if (this.reservationForm.valid) {
      this.reserveTimeSlot.emit(this.reservationForm.value);
    }
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
