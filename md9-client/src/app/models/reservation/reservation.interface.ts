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
    fieldId: string;
    timeSlotId: number;
    paymentMethod: IPaymentMethod; // "Cash" or "Credit"
    confirmationNo: number;
    status: ReservationStatus; // "Done", "Cancelled", "Pending"
    createdAt: string;
}

export interface Cancellation {
    cancellationId: string;
    reservationId: string;
    reason: string;
    cancelledBy: 'ADMIN' | 'USER';
    createdAt: string;
  }