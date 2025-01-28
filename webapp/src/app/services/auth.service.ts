import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}


  // BehaviorSubject:
// This is like a storage place for data. It always holds the latest value.
// You can add new data to it using next(). This will update the stored data and notify anyone who is listening.

// asObservable():
// This creates a read-only version of the BehaviorSubject.
// When you use asObservable(), it turns the BehaviorSubject into an Observable that can only be watched—no one else can change its data.

// Why use it?
// If you have a BehaviorSubject in a service, using asObservable() makes sure only the service can update the data. Other components can listen and react to changes but cannot change the data.

// Subscribing:
// You can subscribe to the Observable to receive updates. Each time there’s new data, your code runs.
// next is where you handle the new data.
// error lets you deal with any issues.
// complete is when the data stream is finished.

  private baseUrl = environment.baseUrl; // Using the base URL from environment
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  loggedIn$ = this.loggedInSubject.asObservable(); // converting loggedInSubject to asObservable

//  Allows the service to control when and what data is emitted, maintaining centralized data flow.
// It emit data to all the components which has subscribe to loggedIn$
  setLoggedInState(state: boolean) {
    this.loggedInSubject.next(state);
  }

  // Method to register a new user
  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      name,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }
  

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      // console.log("isLogin from auth service token mil gya")
      return true;  // If a token is found, the user is logged in
    }
    // console.log("isLogin from auth service token nhi mila gya")
    return false;  // If no token is found, the user is not logged in
  }
  
  get userName() {
// The data was first in object then we converted into string to store in local storage as browser can
// only handle string in login.component.ts file
// Now,below gets the data stored in the browser under the name 'user'. This data is stored as a string.    
    let userData = localStorage.getItem('user');
    if (userData) {
// The data from localStorage in browser is a string, but we need to turn it into an object so we can work with it. 
// JSON.parse(userData) takes that string and converts it back into a JavaScript object so that we can use here.      
      return JSON.parse(userData).name;  
    }
    return null;  // Return null if 'user' is not in localStorage
  }


  get userEmail() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null; // Return null if no user data is found
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  get isAdmin(){
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin; // Return isAdmin if available, otherwise false
    }
    return false; // Return false if no user data exists
  }
  


  

}






// BehaviorSubject:
// This is like a storage place for data. It always holds the latest value.
// You can add new data to it using next(). This will update the stored data and notify anyone who is listening.

// asObservable():
// This creates a read-only version of the BehaviorSubject.
// When you use asObservable(), it turns the BehaviorSubject into an Observable that can only be watched—no one else can change its data.

// Why use it?
// If you have a BehaviorSubject in a service, using asObservable() makes sure only the service can update the data. Other components can listen and react to changes but cannot change the data.

// Subscribing:
// You can subscribe to the Observable to receive updates. Each time there’s new data, your code runs.
// next is where you handle the new data.
// error lets you deal with any issues.
// complete is when the data stream is finished.



