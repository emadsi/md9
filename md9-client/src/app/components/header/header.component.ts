import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  private readonly ADMIN_DATA = 'adminData';
  isAdminLogged: boolean = false

  constructor(private router: Router, private authService: AuthService) {
    this.isAdminLogged = !!this.authService.getAdmin();
  }

  handleHomePage() {
    this.router.navigate(['/']);
  }

  handleAdminLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
  }

}
