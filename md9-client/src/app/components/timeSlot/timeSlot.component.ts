import { Component, OnInit } from '@angular/core';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { ITimeslot } from '../../models/timeslot/timeslot.interface';


@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss'],
  standalone: false
})
export class TimeslotComponent implements OnInit {
  timeslots: ITimeslot[] = [];
  fieldId: string = '';
  newFrom = '';
  newTo = '';
  blockDate: Date;
  selectedTimeslotId: string;

  constructor(private timeslotService: TimeslotService) {}

  ngOnInit(): void {
    this.loadTimeslots();
  }

  loadTimeslots(): void {
    this.timeslotService.getAllTimeslots().subscribe((data) => {
      this.timeslots = data;
    });
  }

  addTimeslot(): void {
    if (this.newFrom && this.newTo && this.fieldId) {
      this.timeslotService.addTimeslot(this.newFrom, this.newTo, this.fieldId).subscribe(() => {
        this.loadTimeslots();
        this.newFrom = '';
        this.newTo = '';
        this.fieldId = '';
      });
    }
  }

  blockTimeslot(): void {
    if (this.selectedTimeslotId && this.blockDate) {
      this.timeslotService
        .blockTimeslot(this.selectedTimeslotId, this.blockDate.toString())
        .subscribe(() => {
          alert('Time slot blocked!');
        });
    }
  }

  blockAllTimeslots(): void {
    if (this.blockDate) {
      this.timeslotService.blockAllTimeslots(this.blockDate).subscribe(() => {
        alert('All time slots blocked!');
      });
    }
  }
}
