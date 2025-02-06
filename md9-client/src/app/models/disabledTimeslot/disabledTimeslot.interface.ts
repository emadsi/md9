export interface DisabledTimeslot {
    id: String;
    timeSlotId: String;
    date: Date; // ISO format (e.g., "2024-12-25")
    reason: string; // "blocked" or "reserved"
  }
  