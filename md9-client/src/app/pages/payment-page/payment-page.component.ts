import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-page',
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.scss',
    standalone: false
})
export class PaymentPageComponent implements OnInit {
    paymentMethod: string | null = null;
  
    constructor(private router: Router) {}
  
    ngOnInit(): void {
      const navigation = this.router.getCurrentNavigation();
      this.paymentMethod = navigation?.extras.state?.['paymentMethod'] || null;
    }
}
