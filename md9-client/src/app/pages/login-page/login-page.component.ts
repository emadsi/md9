import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    standalone: false
})
export class LoginPageComponent {
    loginForm: FormGroup;
    loginError: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
  
    onLogin() {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
          next: () => {
            this.router.navigate(['/admin']);
          },
          error: (err) => {
            this.loginError = 'Invalid credentials. Please try again.';
          }
        });
      }
    }
}
