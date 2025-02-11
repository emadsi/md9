// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-block-dialog',
//   templateUrl: './block-dialog.component.html',
//   styleUrls: ['./block-dialog.component.scss'],
//   standalone: false
// })
// export class BlockDialogComponent {
//   blockForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<BlockDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { timeslotId: string }
//   ) {
//     this.blockForm = this.fb.group({
//       date: ['']
//     });
//   }

//   onBlock(): void {
//     this.dialogRef.close(this.blockForm.value); // Send selected date back
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-block-dialog',
  templateUrl: './block-dialog.component.html',
  styleUrls: ['./block-dialog.component.scss'],
  standalone: false
})
export class BlockDialogComponent {
  blockDate: Date | null = null;

  constructor(
    public dialogRef: MatDialogRef<BlockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmBlock(): void {
    this.dialogRef.close(this.blockDate);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
