import { inject } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);  // Inject Router

  console.log("isLoggedIn:", authService.isLoggedIn);  // Log the isLoggedIn value for debugging

  // Check if the user is logged in
  if (authService.isLoggedIn) {  // isLoggedIn is a getter method, no need for parentheses
    // console.log("authGaurd token mil gya")
    return true;  // Allow navigation
  } else {
    // Redirect to login page if not logged in
    // console.log("authGaurd token nhi mila chlo login page")
    router.navigateByUrl('/login');
    return false;  // Deny access
  }
};
//*******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT
// - **Purpose of the Guard**:  
//   The `authGuard` checks if the user is logged in before allowing them to access a certain route (e.g., a dashboard or profile page).

// - **What it Does**:  
//   - **Step 1**: It uses the `AuthService` to check if the user is logged in.  
//   - **Step 2**: If the user is logged in (i.e., the `isLoggedIn` method returns `true`), the guard lets the user access the route.  
//   - **Step 3**: If the user is not logged in, it redirects them to the login page (`/login`).

// - **Usage**:  
//   You can attach this `authGuard` to specific routes in your Angular routing configuration.  
//   The guard will prevent unauthorized users from accessing these routes.

// What happens when a user tries to access the Profile route??
// If the user is logged in, they will be able to access the ProfileComponent.
// If the user is NOT logged in, they will be redirected to the login page (/login).
