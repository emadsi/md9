import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  isAdminLogged: boolean;
  title = 'MD9';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdminLogged = !!this.authService.getAdmin();
  }
}
