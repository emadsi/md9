import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent implements OnInit {
  private readonly ADMIN_DATA = 'adminData';
  isAdminLogged: boolean = false

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdminLoggedIn$.subscribe((status) => {
      this.isAdminLogged = status;
    });
  }

  handleHomePage() {
    this.router.navigate(['/']);
  }

  handleAdminLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
