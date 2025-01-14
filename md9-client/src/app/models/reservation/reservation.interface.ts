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
    reservationId: number;
    reserverName: string;
    mobile: string;
    date: Date;
    timeSlotId: number;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: number;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
}