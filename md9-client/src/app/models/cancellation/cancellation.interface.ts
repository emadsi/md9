export interface Cancellation {
    cancellationId: string;
    reservationId: string;
    reason: string;
    cancelledBy: 'ADMIN' | 'USER';
    createdAt: Date;
}