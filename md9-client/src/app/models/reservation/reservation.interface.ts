export enum IPaymentMethod {
    cash = "Cash",
    credit = " Credit"
} 

export enum ReservationStatus {
    done = "Done",
    cancelled = "Cancelled",
    pending = "Pending"
}

export interface IReservation {
    reservationId: string;
    reserverName: string;
    mobile: string;
    date: Date;
    fieldId: string;
    timeslotId: string;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: string;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
    createdAt: string;
}