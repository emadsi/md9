import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-field-reservation',
    templateUrl: './field-reservation.component.html',
    styleUrl: './field-reservation.component.scss',
    standalone: false
})
export class FieldReservationComponent {
  @Input() fieldId: string;
  @Input() fieldName: string;
  @Input() imagePath: string;

  constructor(private router: Router) {}

  handleReserve(): void {
    this.router.navigate([`reservation/${this.fieldId}`])
  }
}
