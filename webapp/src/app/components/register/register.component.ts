import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
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

      this.authService.register(name, email, password).subscribe({
        next: (result) => {
          // Success response
          alert("User registered successfully");
          // Optionally, navigate to another page or reset form
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          // Handle error response
          console.error("Registration failed", err);
          alert("Registration failed. Please try again.");
        }
      });
    } else {
      alert("Please fill out the form correctly.");
    }
  }


  


}

