export interface DisabledTimeslot {
    id: string;
    timeslotId: string;
    fieldId: string;
    date: string; // ISO format (e.g., "2024-12-25")
    reason: string; // "blocked" or "reserved"
  }
  