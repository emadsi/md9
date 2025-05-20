export interface IReservation {
    reservationId: string;
    reserverName: string;
    mobile: string;
    date: string;
    fieldId: string;
    timeslotId: string;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: string;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
    createdAt: string;
}

export enum IPaymentMethod {
    cash = "Cash",
    credit = "Credit"
} 

export enum ReservationStatus {
    DONE = "Done",
    CANCELLED = "Cancelled",
    PENDING = "Pending"
}