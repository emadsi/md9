import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPaymentMethod, IReservation, ReservationStatus } from '../../models/reservation/reservation.interface';
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
  @Input() fieldId!: string;
  @Input() timeslots: ITimeslot[] = [];
  @Input() disabledTimeslots: DisabledTimeslot[] = [];
  @Input() prefillData: IReservation | null = null;

  @Output() reserveTimeslot = new EventEmitter<IReservation>();

  paymentMethodOptions = IPaymentMethod;

  reservationForm!: FormGroup;
  disabledTimeslotIds: string[] = [];
  selectedDate: Date | null = null;
  disabledDates: string[] = [];

  constructor(
    private reservationFormService: ReservationFormService
  ) {}

  ngOnInit(): void {
    // this.filterDisabledTimeslots();

    this.computeFullyBookedDates();

    if (this.prefillData) {
      this.selectedDate = new Date(this.prefillData.date);
      this.createForm(this.prefillData);
      this.filterDisabledTimeslots(this.prefillData.date);
    } else {
      this.createForm();
    }
  }

  private createForm(reservation?: IReservation): void {
    this.reservationForm = this.reservationFormService.createReservationForm(reservation);
    this.fieldIdForm.patchValue(this.fieldId);
  }

  private filterDisabledTimeslots(date: string): void {
    this.disabledTimeslotIds = this.disabledTimeslots
      .filter(d => d.fieldId === this.fieldId && d.date === date)
      .map(slot => slot.timeslotId);
  }  

  resetForm(): void {
    this.reservationForm.reset();
    this.selectedDate = null;
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
  
    // ✅ Use ISO format "yyyy-MM-dd"
    const formattedDate = date.toISOString().split('T')[0];
    this.filterDisabledTimeslots(formattedDate);
    this.dateForm.patchValue(formattedDate);
  
    // ✅ Clear timeslot selection
    this.timeslotId.setValue(null);
    this.timeslotId.markAsUntouched();
  }  

  submitReservation(): void {
    if (this.reservationForm.invalid || !this.selectedDate) {
      this.reservationForm.markAllAsTouched();
      return;
    }
  
    this.reserveTimeslot.emit(this.reservationForm.value);
  }  

  // Disable past dates and fully booked dates
  isDateDisabled = (date: Date): boolean => {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
  
    const formatted = target.toISOString().split('T')[0];
    const isFullyBooked = this.disabledDates.includes(formatted);
    const isBeforeToday = target < today;
  
    // ✅ Disable if it's a past date OR fully booked
    const shouldDisable = isBeforeToday || isFullyBooked;
    return !shouldDisable;
  };    

  private computeFullyBookedDates(): void {
    const totalSlots = this.timeslots.length;
    const countByDate: Record<string, number> = {};

    this.disabledTimeslots.forEach((entry) => {
      if (entry.fieldId === this.fieldId) {
        countByDate[entry.date] = (countByDate[entry.date] || 0) + 1;
      }
    });

    this.disabledDates = Object.entries(countByDate)
      .filter(([_, count]) => count >= totalSlots)
      .map(([date]) => date);
  }

  // Getters for template
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

  get fieldIdForm(): FormControl {
    return this.reservationForm.get('fieldId') as FormControl;
  }

  get dateForm(): FormControl {
    return this.reservationForm.get('date') as FormControl;
  }
}