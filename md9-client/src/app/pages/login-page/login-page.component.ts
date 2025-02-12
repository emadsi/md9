import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    standalone: false
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    loginError: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
  
    onLogin() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe({
          next: () => {
            this.router.navigate(['/admin']);
          },
          error: (err) => {
            this.loginError = 'Invalid username or password. Please try again.';
          }
        });
      }
    }
}
