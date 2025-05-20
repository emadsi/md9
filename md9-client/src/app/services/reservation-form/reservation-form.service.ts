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
            mobile: [reservation?.mobile ?? '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            date: [reservation?.date ??  '', Validators.required],
            timeslotId: [reservation?.timeslotId ?? null, Validators.required],
            fieldId: [reservation?.fieldId ?? ''],
            paymentMethod: [reservation?.paymentMethod ?? '', Validators.required],
            confirmationNo: [reservation?.confirmationNo ?? ''],
            status: [reservation?.status ?? ReservationStatus.PENDING],
            createdAt: [reservation?.createdAt ?? Date.now().toString()]
          });
    }
}