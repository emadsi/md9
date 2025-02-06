// block-timeslots.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-block-timeslots',
  templateUrl: './block-timeslots.component.html',
  styleUrls: ['./block-timeslots.component.scss'],
  standalone: false
})
export class BlockTimeslotsComponent {
  date: string = '';
  timeSlot: string = '';

  constructor(private http: HttpClient) {}

  blockTimeslot() {
    this.http
      .post('/api/timeslots/block', { date: this.date, timeSlot: this.timeSlot })
      .subscribe(() => {
        alert('Timeslot blocked successfully.');
      });
  }
}
