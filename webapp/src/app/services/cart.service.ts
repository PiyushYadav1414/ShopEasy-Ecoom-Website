import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Importing the environment file
import { Product } from '../types/product';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.baseUrl; // Using the base URL from environment

  items: CartItem[] = []; // Define cart items array

  constructor(private http: HttpClient) {
    this.init(); // Initialize the cart items when the service is created
  }

  // Initialize cart items by fetching them from the server
  init() {
    this.getCartItems().subscribe((result) => {
      this.items = result; // Populate the items array with the fetched data
    });
  }

  // Fetch cart items from the server
  getCartItems() {
    return this.http.get<{ product: Product; quantity: number }[]>(
      `${this.baseUrl}/customer/carts`
    );
  }

  // Add a product to the cart
  addToCart(productId: string, quantity: number) {
    return this.http.post(`${this.baseUrl}/customer/carts/${productId}`, { quantity });
  }

  // Remove a product from the cart
  removeFromCart(productId: string) {
    return this.http.delete(`${this.baseUrl}/customer/carts/${productId}`);
  }
}
