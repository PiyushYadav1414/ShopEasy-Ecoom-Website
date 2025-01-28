import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false; // Added loading state

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    // Initialize the reactive form
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Corrected email validator
      password: ['', [Validators.required, Validators.minLength(5)]], // Added Validators.required
    });
  }

  // Method to handle form submission
  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log('Form Submitted', this.registerForm.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  register() {
    // Check if the form is valid before submitting
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // Set loading to true before making the API call
      this.loading = true;

      this.authService.register(name, email, password).subscribe({
        next: (result) => {
          // Set loading to false
          this.loading = false;

          // Show success toaster
          this.snackBar.open('User registered successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          // Navigate to login page
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          // Set loading to false
          this.loading = false;

          // Show error toaster
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });

          console.error("Registration failed", err);
        }
      });
    } else {
      // Show form validation error toaster
      // In your component
      this.snackBar.open('Your message', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });

    }
  }
}
