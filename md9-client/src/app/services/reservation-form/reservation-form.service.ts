import { Injectable } from "@angular/core";
import { IReservation, ReservationStatus } from "../../models/reservation/reservation.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ReservationFormService {

    constructor(private fb: FormBuilder) { }

    createReservationForm(reservation?: IReservation): FormGroup{
        return this.fb.group({
            reservationId: [reservation?.reservationId ?? ''],
            reserverName: [reservation?.reserverName ?? '', Validators.required],
            mobile: [reservation?.mobile ?? '', Validators.required],
            date: [reservation?.date ??  Date.now(), Validators.required],
            timeSlotId: [reservation?.timeSlotId ?? ''],
            paymentMethod: [reservation?.paymentMethod ?? '', Validators.required],
            confirmationNo: [reservation?.confirmationNo ?? ''],
            status: [reservation?.status ?? ReservationStatus.pending]
          });
    }
}