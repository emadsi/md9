import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const publicRoutes = ['login', '/', 'reservation/:fieldId', 'payment', 'cancel']; // Add other public routes if necessary
    const url: string = route.url.map(segment => segment.path).join('/');

    if (publicRoutes.includes(`/${url}`)) {
      return true; // Allow access to public routes
    }

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
