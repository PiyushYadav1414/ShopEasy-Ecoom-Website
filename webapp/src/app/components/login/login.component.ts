import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inject FormBuilder to create a reactive form
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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

  //   login() {
  //     // Log the form values to the console
  //     console.log(this.loginForm.value);
  //     let formData = this.loginForm.value;
  //     // Call the login method from AuthService
  //     this.authService.login(formData.email!, formData.password!).subscribe(
  //       (result:any) => {
  //         // Log the result (Token and User Object)
  //         console.log(result);

  // //The token is like a "key" that proves the user is logged in. You store it in localStorage so that the 
  // // user doesn't have to log in again every time they refresh the page or come back later.        
  //         localStorage.setItem('token', result.token);
  //   // Convert the object to a JSON string as local storage can store only string not objects     
  //         localStorage.setItem('user', JSON.stringify(result.user)); 
  //         this.router.navigateByUrl("/");
  //       },
  //       (error) => {
  //         // Handle error if login fails
  //         console.error('Login failed:', error);
  //       }
  //     );
  //   }

login() {
  this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
    .subscribe(
      (result: any) => {
        console.log('Login successful:', result);

// The token is like a "key" that proves the user is logged in. You store it in localStorage so that the 
// user doesn't have to log in again every time they refresh the page or come back later.  
        localStorage.setItem('token', result.token);
        // Convert the object to a JSON string as local storage can store only string not objects
        localStorage.setItem('user', JSON.stringify(result.user));

// calling the setLoggedInState method which will update the value of behaviour subject adn will tell
// that user is loggin successfully as it gives it true. 
        this.authService.setLoggedInState(true);

        // roting back to home component after successfull login
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
}


}

