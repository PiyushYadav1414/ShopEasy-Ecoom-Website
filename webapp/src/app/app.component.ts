import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
import { CustomerService } from './services/customer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService,private wishlistService: WishlistService,private cartService: CartService, private customerService: CustomerService){}
  title = 'E-COMM-STORE';

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.wishlistService.init();
      this.cartService.init();
    }
  }
  
}
