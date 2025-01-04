import { Component, OnInit } from '@angular/core';
// import { TimeSlot } from '../../models/timeslot/timeslot.interface';
import { TimeSlotService } from '../../services/timeSlot/timeSlot.service';
import { ITimeSlot } from '../../models/reservation/reservation.interface';


@Component({
  selector: 'app-timeSlot',
  templateUrl: './timeSlot.component.html',
  styleUrls: ['./timeSlot.component.scss'],
  standalone: false
})
export class TimeSlotComponent implements OnInit {
  timeSlots: ITimeSlot[] = [];
  newFrom = '';
  newTo = '';
  blockDate: Date;
  selectedTimeSlotId: number;

  constructor(private timeSlotService: TimeSlotService) {}

  ngOnInit(): void {
    this.loadTimeSlots();
  }

  loadTimeSlots(): void {
    this.timeSlotService.getAllTimeSlots().subscribe((data) => {
      this.timeSlots = data;
    });
  }

  addTimeSlot(): void {
    if (this.newFrom && this.newTo) {
      this.timeSlotService.addTimeSlot(this.newFrom, this.newTo).subscribe(() => {
        this.loadTimeSlots();
        this.newFrom = '';
        this.newTo = '';
      });
    }
  }

  blockTimeSlot(): void {
    if (this.selectedTimeSlotId && this.blockDate) {
      this.timeSlotService
        .blockTimeSlot(this.selectedTimeSlotId, this.blockDate)
        .subscribe(() => {
          alert('Time slot blocked!');
        });
    }
  }

  blockAllTimeSlots(): void {
    if (this.blockDate) {
      this.timeSlotService.blockAllTimeSlots(this.blockDate).subscribe(() => {
        alert('All time slots blocked!');
      });
    }
  }
}
