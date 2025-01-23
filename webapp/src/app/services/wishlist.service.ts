import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';  // Importing the environment file
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl = environment.baseUrl;  // Using the base URL from environment

  constructor(private http: HttpClient) { }

  // Array to store wishlist products
  wishlists: Product[] = [];

  // Initialize the wishlist by fetching data from the API
  //The init() method will only run when you call it
  init() {
    return this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
  }

  // Fetch wishlist items from the server
  getWishlists() {
    return this.http.get<Product[]>(`${this.baseUrl}/customer/wishlists`);
  }

  // Add a product to the wishlist
  addInWishlist(productId: string) {
    return this.http.post(`${this.baseUrl}/customer/wishlists/${productId}`, {});
  }

  // Remove a product from the wishlist
  removeFromWishlists(productId: string) {
    return this.http.delete(`${this.baseUrl}/customer/wishlists/${productId}`);
  }
}
