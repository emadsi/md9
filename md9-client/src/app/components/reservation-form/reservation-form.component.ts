import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IReservation } from '../../models/reservation/reservation.interface';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';
import { DisabledTimeslot } from '../../models/disabledTimeslot/disabledTimeslot.interface';
import { ReservationFormService } from '../../services/reservation-form/reservation-form.service';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';

@Component({
    selector: 'app-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrl: './reservation-form.component.scss',
    standalone: false
})
export class ReservationFormComponent implements OnInit {
  @Input() fieldId: string
  @Input() timeslots: ITimeslot[] = [];
  @Input() disabledTimeslotIds: string[] = [];
  @Output() reserveTimeslot = new EventEmitter<IReservation>();

  reservationForm: FormGroup;
  selectedDate: Date | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationFormService: ReservationFormService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.reservationForm = this.reservationFormService.createReservationForm();
  }

  // onDateChange(date: Date): void {
  //   this.selectedDate = date;
  //   this.filterAvailableSlots();
  //   this.reservationForm.patchValue({
  //     date: this.selectedDate?.toISOString().split('T')[0]
  //   });
  // }
  onDateChange(date: Date): void {
    this.selectedDate = date;
  }

  // private filterAvailableSlots(): void {
  //   if (!this.selectedDate) return;
  //   const selectedDay = this.selectedDate.toISOString().split('T')[0];

  //   const disabledSlotIds = this.disabledTimeslots
  //     .filter(d => d.date === selectedDay)
  //     .map(d => d.timeslotId);

  //   this.availableSlots = this.timeslots.filter(slot => !disabledSlotIds.includes(slot.id));
  // }

  // isTimeslotDisabled(slotId: string): boolean {
  //   const selectedDay = this.selectedDate?.toISOString().split('T')[0];
  //   return this.disabledTimeslots.some(
  //     d => d.date === selectedDay && d.timeslotId === slotId
  //   );
  // }

  submitReservation(): void {
    if (this.reservationForm.valid && this.selectedDate) {
      const reservation: IReservation = {
        ...this.reservationForm.value,
        fieldId: this.fieldId,
        date: this.selectedDate.toISOString().split('T')[0]
      };
      this.reserveTimeslot.emit(reservation);
    }
  }

  // FormControl getters for template access (optional)
  get reserverName(): FormControl {
    return this.reservationForm.get('reserverName') as FormControl;
  }

  get mobile(): FormControl {
    return this.reservationForm.get('mobile') as FormControl;
  }

  get timeslotId(): FormControl {
    return this.reservationForm.get('timeslotId') as FormControl;
  }

  get paymentMethod(): FormControl {
    return this.reservationForm.get('paymentMethod') as FormControl;
  }
}
