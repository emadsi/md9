import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {

  constructor(private router: Router) {}

  handleHomePage() {
    this.router.navigate(['/']);
  }

  handleAdminLogin() {
    this.router.navigate(['login']);
  }

}
