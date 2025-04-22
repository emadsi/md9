import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // These are public API paths that should NOT have Authorization
  const publicPaths = [
    '/api/timeslots',
    '/api/disabledTimeslots',
    '/api/reservations', // only if creating is public
    '/api/auth/login'
  ];

  const isPublic = publicPaths.some(path => req.url.includes(path));

  if (isPlatformBrowser(platformId) && !isPublic){
    const token = localStorage.getItem('authToken');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned);
    }
  }

  return next(req);
};
