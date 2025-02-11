// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ReservationService } from '../../services/reservation/reservation.service';
// import { AdminService } from '../../services/admin/admin.service';
// import { TimeslotService } from '../../services/timeslot/timeslot.service';

// @Component({
//   selector: 'app-admin-page',
//   templateUrl: './admin-page.component.html',
//   styleUrls: ['./admin-page.component.scss']
// })
// export class AdminPageComponent implements OnInit {
//   displayedColumns: string[] = ['name', 'mobile', 'field', 'date', 'time', 'actions'];
//   dataSource = new MatTableDataSource();

//   constructor(
//     private reservationService: ReservationService,
//     private adminService: AdminService,
//     private timeslotService: TimeslotService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loadReservations();
//   }

//   loadReservations() {
//     this.reservationService.getAllReservations().subscribe(
//       (reservations: any) => {
//         this.dataSource.data = reservations;
//       },
//       (error) => {
//         this.snackBar.open('Failed to load reservations', 'Close', { duration: 3000 });
//       }
//     );
//   }

//   cancelReservation(id: string) {
//     this.reservationService.cancelReservation(id).subscribe(
//       () => {
//         this.snackBar.open('Reservation Cancelled', 'Close', { duration: 3000 });
//         this.loadReservations();
//       },
//       (error) => {
//         this.snackBar.open('Failed to cancel reservation', 'Close', { duration: 3000 });
//       }
//     );
//   }

//   blockTimeslot(date: Date, timeslotId: string) {
//     this.timeslotService.blockTimeslot(timeslotId, date.toString()).subscribe(
//       () => {
//         this.snackBar.open('Time Slot Blocked', 'Close', { duration: 3000 });
//       },
//       (error) => {
//         this.snackBar.open('Failed to block time slot', 'Close', { duration: 3000 });
//       }
//     );
//   }

//   unblockTimeslot(date: Date, timeslotId: string) {
//     this.timeslotService.unblockTimeslot(timeslotId, date.toString()).subscribe(
//       result =>  result ? 
//         this.snackBar.open('Time Slot Unblocked', 'Close', { duration: 3000 })
//         :
//         this.snackBar.open('Failed to unblock time slot', 'Close', { duration: 3000 })
//     )
      
//   }

//   unlockDeposit(reservationId: string) {
//     // this.adminService.unlockDeposit(reservationId).subscribe(
//     //   () => {
//     //     this.snackBar.open('Insurance Deposit Unlocked', 'Close', { duration: 3000 });
//     //   },
//     //   (error) => {
//     //     this.snackBar.open('Failed to unlock deposit', 'Close', { duration: 3000 });
//     //   }
//     // );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin/admin.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: false
})
export class AdminPageComponent implements OnInit {
  reservations: any[] = [];
  displayedColumns: string[] = ['id', 'user', 'field', 'date', 'time', 'actions'];

  constructor(private adminService: AdminService, 
    private reservationService: ReservationService, 
    private timeslotService: TimeslotService,
    private disabledTimeslot: DisabledTimeslotService, 
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getAllReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  fetchBlockedTimeslots() {
    this.disabledTimeslot.getAllDisabledTimeslots().subscribe((data) => {
      console.log('Blocked Time Slots:', data);
      this.snackBar.open('Blocked time slots fetched!', 'Close', { duration: 3000 });
    });
  }

  cancelReservation(id: string) {
    this.reservationService.cancelReservation(id).subscribe(() => {
      this.snackBar.open('Reservation Canceled!', 'Close', { duration: 3000 });
      this.fetchReservations();
    });
  }

  blockTimeslot(timeslotId: string, date: Date) {
    this.timeslotService.blockTimeslot(timeslotId, date.toString()).subscribe(() => {
      this.snackBar.open('Time Slot Blocked!', 'Close', { duration: 4000 });
    });
  }
  unBlockTimeslot(timeslotId: string, date: Date) {
    this.timeslotService.unblockTimeslot(timeslotId, date.toString()).subscribe(
        result => result ? this.snackBar.open('Timeslot is Unblocked anymore')
        : this.snackBar.open('Can not Unblock Timeslot. try again later', 'Close', { duration: 4000 })
    )
  }

  unlockDeposit(id: string) {
    // this.adminService.unlockDeposit(id).subscribe(() => {
    //   this.snackBar.open('Deposit Unlocked!', 'Close', { duration: 3000 });
    // });
  }
}
