import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrl: './payment-form.component.scss',
    standalone: false
})
export class PaymentFormComponent {
    @Input() paymentMethod: string | null = null;
    paymentForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.paymentForm = this.fb.group({
        cardNumber: ['', Validators.required],
        expirationDate: ['', Validators.required],
        cvv: ['', Validators.required],
        id: ['', Validators.required],
        amount: [{ value: '340 ILS', disabled: true }, Validators.required]
      });
    }
  
    onSubmit() {
      if (this.paymentForm.valid) {
        if (this.paymentMethod === 'Cash') {
          // Call Obligo API
        } else if (this.paymentMethod === 'Credit') {
          // Call credit card API
        }
      } else {
        this.paymentForm.markAllAsTouched();
      }
    }
}
