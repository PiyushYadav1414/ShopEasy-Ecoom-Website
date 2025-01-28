import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inject FormBuilder to create a reactive form
  loginForm: FormGroup;
  loading: boolean = false; // Added loading state

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with email and password controls
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // email is required and should be a valid email
      password: ['', [Validators.required]]  // password is required
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  login() {
    // Set loading to true before making the API call
    this.loading = true;

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe(
        (result: any) => {
          // Set loading to false
          this.loading = false;

          console.log('Login successful:', result);

          // The token is like a "key" that proves the user is logged in. You store it in localStorage so that the 
          // user doesn't have to log in again every time they refresh the page or come back later.  
          localStorage.setItem('token', result.token);
          // Convert the object to a JSON string as local storage can store only string not objects
          localStorage.setItem('user', JSON.stringify(result.user));

          // calling the setLoggedInState method which will update the value of behaviour subject adn will tell
          // that user is loggin successfully as it gives it true. 
          this.authService.setLoggedInState(true);

          // Show success toaster
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          // roting back to home component after successfull login
          this.router.navigate(['/']);
        },
        (error) => {
          // Set loading to false
          this.loading = false;

          console.error('Login failed:', error);

          // Show error toaster
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      );
  }
}
