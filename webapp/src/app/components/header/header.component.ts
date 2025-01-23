import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Category } from 'src/app/types/category';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy { // Ensure OnInit is implemented
  categoryList: Category[] = []; // Ensure the property is declared and initialized
  searchTerm!: string; //we will clear the text enetr by user in serach text box when user naviagtes to any page
  isWishlist: boolean = false; // Initial state (empty heart)
  private authSubscription!: Subscription;

  constructor(private customerService: CustomerService, private router: Router, public authService: AuthService) {
      console.log("Home constructor")
  }

// Subscribes to the asObserver Observable to receive real-time updates.
// Below we have subscribe to the Observable to receive updates. Each time there’s new data, your code 
// runs. which gives latest value of Behaviour subject i.e user is loggedIn or not
  ngOnInit() {
    this.authSubscription = this.authService.loggedIn$.subscribe(res => {
      if (res) {
        this.loadCategories();
      } else {
        this.categoryList = [];
      }
    });

    // Initial load if user is already logged in
    if (this.authService.isLoggedIn) {
      this.loadCategories();
    }
  }


  loadCategories() {
    this.customerService.getCategories().subscribe((res) => {
      this.categoryList = res;
      console.log(this.categoryList);
    });
  }

// OnDestroy is a lifecycle hook in Angular that gets called when a component is destroyed.
// When the HeaderComponent is destroyed, the subscription to authService.loggedIn$ is stopped.
// This ensures that the component does not keep listening for login state changes when it’s no longer in use.

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe(); // we will unsubscribe to listen data from Observable (login or not login)
    }
  }

//   If the user enters "red & blue":
// Navigates to /products?search=red%20%26%20blue (with encodeURIComponent applied).
  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl("/products?search=" + encodeURIComponent(e.target.value));
    }
  }
  

  searchCategory(id: string) {
    this.router.navigateByUrl("/products?categoryId=" + encodeURIComponent(id));
    this.searchTerm="";
  }

  logout(){
    this.authService.logout();
    // Redirect to the login page after logging out
    this.router.navigateByUrl('/login');
  }
  

  

  toggleWishlist() {
    this.isWishlist = !this.isWishlist;

    // Navigate based on the state of the heart icon
    if (this.isWishlist) {
      this.router.navigateByUrl("/wishlists"); // Navigate to wishlist
    } else {
      this.router.navigateByUrl("/"); // Navigate to home page
    }
  }


}
 