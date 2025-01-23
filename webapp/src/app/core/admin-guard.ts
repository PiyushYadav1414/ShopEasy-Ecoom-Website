import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    if (authService.isAdmin) { // check if isAdmin exist 
      return true; // Allow navigation for admin users
    } else {
      router.navigateByUrl('/'); // Redirect non-admin logged-in users to the home page
      return false;
    }
  } else {
    router.navigateByUrl('/login'); // Redirect unauthenticated users to the login page
    return false;
  }
};
