import { Component, Input } from '@angular/core';
import { Product } from 'src/app/types/product'; // Ensure the path to Product is correct
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; // Input property to receive product data

  constructor(private wishlistService: WishlistService , private cartService: CartService) {}

  // Getter for calculating the final selling price after discount
  get sellingPrice(): string {
    return (
      this.product.price - (this.product.price * this.product.discount) / 100
    ).toFixed(2);
  }

  // Method to add/remove the product from the wishlist
  addToWishList(product: Product): void {
    if (this.isInWishlist(product)) {
      // If the product is already in the wishlist, remove it
      this.wishlistService.removeFromWishlists(product._id!).subscribe(() => {
        console.log(`Product ${product._id} removed from wishlist`);
        this.wishlistService.init(); // Update the wishlist
      });
    } else {
      // If the product is not in the wishlist, add it
      this.wishlistService.addInWishlist(product._id!).subscribe(() => {
        console.log(`Product ${product._id} added to wishlist`);
        this.wishlistService.init(); // Update the wishlist
      });
    }
  }

// Method to check if a product is already in the wishlist
// While some checks if at least one item satisfies the condition, filter returns all items that match
// the condition, resulting in an array of matching items.
  isInWishlist(product: Product): boolean {
    return this.wishlistService.wishlists.some((wishlistItem) =>
       wishlistItem._id === product._id
    );
  }
 
  addToCart(product: Product) {
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(()=>{// Add product to the cart
        this.cartService.init(); // array in cartSrvice gets updated with new values 
      }) 
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(()=>{// Remove product from the cart
        this.cartService.init();// array in cartSrvice gets updated with new values 
      }) 
    }
  }
   
  isProductInCart(productId: string): boolean {
    // Check if the product exists in the cart items
    if (this.cartService.items.find(x => x.product._id === productId)) {
      return true;
    }
    return false;
  }
  



}











