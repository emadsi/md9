import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-number',
  standalone: false,
  
  templateUrl: './confirmation-number.component.html',
  styleUrl: './confirmation-number.component.scss'
})
export class ConfirmationNumberComponent {
   
  message: string = '';
  adminId: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; adminId: string }
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.adminId = this.data.adminId;

    // Automatically close after 5 seconds
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }
}
