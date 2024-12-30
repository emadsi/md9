export interface TimeSlot {
    id: string;
    startTime: string; // "HH:mm" format
    endTime: string;   // "HH:mm" format
    available: boolean;
  }