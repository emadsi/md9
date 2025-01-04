export interface DisabledTimeSlot {
    id: number;
    timeSlotId: number;
    date: string; // ISO format (e.g., "2024-12-25")
    reason: string; // "blocked" or "reserved"
  }
  