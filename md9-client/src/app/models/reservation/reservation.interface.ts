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
    reservationId: String;
    reserveeName: string;
    mobile: string;
    date: Date;
    timeSlotId: String;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: number;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
}

export interface ITimeSlot {
    id: String;
    startTime: string; // "HH:mm" format
    endTime: string; // "HH:mm" format
}