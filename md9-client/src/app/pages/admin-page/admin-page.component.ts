import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin/admin.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { TimeslotService } from '../../services/timeslot/timeslot.service';
import { DisabledTimeslotService } from '../../services/disabledTimeslot/disabledTimeslot.service';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../../components/block-dialog/block-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { IAdmin } from '../../models/admin/admin.interface';
import { ConfirmationNumberComponent } from '../../components/confirmation-number/confirmation-number.component';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: false
})
export class AdminPageComponent implements OnInit {
  admin: IAdmin;
  reservations: any[] = [];
  displayedColumns: string[] = ['id', 'user', 'field', 'date', 'time', 'actions'];
  
  timeslotsField1: any[] = [];
  timeslotsField2: any[] = [];
  currentView: string = 'timeslots';
  selectedSlot: any;
  selectedBlockDate: any;
  blockDate: Date | null = null;
  isSuperAdmin: Boolean = false;
  message: string | null = null; // ✅ Display messages

  constructor(
    private authService: AuthService,
    private adminService: AdminService, 
    private reservationService: ReservationService, 
    private timeslotService: TimeslotService,
    private disabledTimeslotService: DisabledTimeslotService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.admin = this.authService.getAdmin();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.fetchReservations();
    this.loadTimeslots();
  }

  setView(view: string) {
    this.currentView = view;
  }

  fetchReservations() {
    this.reservationService.getAllReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  loadTimeslots() {
    this.timeslotService.getAllTimeslots().subscribe(data => {
      this.timeslotsField1 = data.filter(t => t.fieldId === '1');
      this.timeslotsField2 = data.filter(t => t.fieldId === '2');
    });
  }

  deleteTimeslot(id: string) {
    if (confirm('Are you sure you want to delete this timeslot?')) {
      this.timeslotService.deleteTimeslot(id).subscribe(() => {
        this.loadTimeslots();
      });
    }
  }

  openBlockDialog(): void {
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Blocking timeslot for:', result);
        // Call API to block timeslot here
      }
    });
  }

  confirmBlock() {
    if (this.selectedBlockDate) {
      const payload = {
        timeslotId: this.selectedSlot.id,
        blockDate: this.selectedBlockDate
      };
      this.timeslotService.blockTimeslot(payload.timeslotId, payload.blockDate.toString()).subscribe(() => {
        this.loadTimeslots();
        this.dialog.closeAll();
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  fetchBlockedTimeslots() {
    this.disabledTimeslotService.getAllDisabledTimeslots().subscribe((data) => {
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

  registerAdmin(admin: IAdmin) {
    this.adminService.registerAdmin(admin).subscribe({
      next: (response) => {
        this.dialog.open(ConfirmationNumberComponent, {
          data: {
            message: 'You have successfully registered a new admin.',
            adminId: response
          }
        });
        this.message = `✅ Registration successful!`;
      },
      error: (err) => {
        throwError(() => new Error(`Faild to connect to Server! \n Error: ${err}`));
        this.message = `❌ Faild to Register Admin!`;
      }
    });
  }

  updateAdmin(admin: IAdmin) {
    this.adminService.updateAdmin(admin).subscribe({
      next: () => {
          // alert("Profile updated successfully");
          this.dialog.open(ConfirmationNumberComponent, {
            data: {
              message: 'Profile updated successfully',
              adminId: admin.adminId
            }
          });
      },
      error: (err) => alert(err.error),
  });
  }

  unlockDeposit(id: string) {
    // this.adminService.unlockDeposit(id).subscribe(() => {
    //   this.snackBar.open('Deposit Unlocked!', 'Close', { duration: 3000 });
    // });
  }
}
