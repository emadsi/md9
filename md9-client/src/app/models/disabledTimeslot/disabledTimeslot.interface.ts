export interface DisabledTimeslot {
    id: String;
    timeslotId: String;
    date: Date; // ISO format (e.g., "2024-12-25")
    reason: string; // "blocked" or "reserved"
  }
  