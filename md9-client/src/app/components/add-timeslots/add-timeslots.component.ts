// add-timeslots.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-timeslots',
  templateUrl: './add-timeslots.component.html',
  styleUrls: ['./add-timeslots.component.scss'],
  standalone: false
})
export class AddTimeslotsComponent {
  date: string = '';
  timeslot: string = '';

  constructor(private http: HttpClient) {}

  addTimeslot() {
    this.http
      .post('/api/timeslots', { date: this.date, timeslot: this.timeslot })
      .subscribe(() => {
        alert('Timeslot added successfully.');
      });
  }
}
