import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return true;

    const publicRoutes = ['/login', '/', 'reservations']; // Add other public routes if necessary
    const url: string = route.url.map((segment) => segment.path).join('/');

    if (publicRoutes.includes(`/${url}`)) {
      return true; // Allow access to public routes
    }

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
