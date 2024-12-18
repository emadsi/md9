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
    reserveeName: string;
    mobile: string;
    date: Date;
    timeSlot: ITimeSlot;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: number;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
}

export interface ITimeSlot {
    id: number;
    from: string;
    to: string
}