import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    standalone: false
})
export class HomePageComponent {
[x: string]: any;

  constructor(private router: Router) {}

  handleCancelReservation() {
    this.router.navigate(['cancel']);
  }
}
