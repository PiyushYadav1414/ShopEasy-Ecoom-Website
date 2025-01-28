import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Product } from 'src/app/types/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent implements OnInit {
  constructor(public wishlistService: WishlistService, private authService: AuthService) { }

  wishlists: Product[] = [];
  name: any;
  loading: boolean = true; // Add loading state

  ngOnInit() {
    // this.wishlistService.init();
    // Fetch the wishlist items and assign to the `wishlists` array
    this.loading = true; // Set loading to true before fetching
    this.wishlistService.getWishlists().subscribe(
      (result) => {
        this.wishlists = result;
        this.loading = false; // Set loading to false after fetching
      },
      (error) => {
        console.error('Error fetching wishlists:', error);
        this.loading = false; // Set loading to false if there's an error
      }
    );
    this.name = this.authService.userName;
  }
}
