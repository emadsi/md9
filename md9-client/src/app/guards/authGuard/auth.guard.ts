import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const publicRoutes = ['home', 'login', 'reservation', 'payment', 'cancel']; // Publicly accessible routes

    const url: string = route.routeConfig?.path?.split('/')[0] || ''; // Extract the first part of the path

    if (publicRoutes.includes(url)) {
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