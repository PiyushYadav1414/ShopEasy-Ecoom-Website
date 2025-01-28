import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Product } from 'src/app/types/product';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private customerService: CustomerService, 
    private route: ActivatedRoute, 
    private wishlistService: WishlistService, 
    private cartService: CartService
  ) {}

  product!: Product;
  loading: boolean = true; // Added loading state

  // Selected size
  selectedSize = '-1'; // Default is "Select"

  // Array of sizes with value and label
  sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'x-large', label: 'X-Large' },
    { value: 'xx-large', label: 'XX-Large' },
    { value: 'xx-large-big', label: 'XX-Large Big' },
    { value: '3x-large', label: '3X-Large' }
  ];

  mainImage!: string; // Main Image
  similarProducts: Product[] = [];

  ngOnInit(): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // const id = this.route.snapshot.params['id']; // Accessing the product ID from the route params
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }

  getProductDetail(id: string) {
    this.loading = true; // Set loading to true before fetching product details
    this.customerService.getProductById(id).subscribe(
      (result) => {
        this.product = result;
        this.mainImage = this.product.images[0]; // Main image url which should be displayed bigger
        console.log(this.product);

        this.customerService.getProducts('', this.product.categoryId, '', -1, '', 1, 4).subscribe(
          (similarResult) => {
            this.similarProducts = similarResult;
            this.loading = false; // Set loading to false after fetching similar products
          },
          (error) => {
            console.error('Error fetching similar products:', error);
            this.loading = false; // Ensure loading is set to false even if there's an error
          }
        );
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.loading = false; // Ensure loading is set to false if there's an error
      }
    );
  }

  changeImage(url: string): void {
    this.mainImage = url; // if user click on any smaller image then make it main image and show it bigger
  }

  // Getter for calculating final selling price after discount
  get sellingPrice() {
    return (this.product.price - (this.product.price * this.product.discount) / 100).toFixed(2);
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
  isInWishlist(product: Product): boolean {
    return this.wishlistService.wishlists.some(
      (wishlistItem) => wishlistItem._id === product._id
    );
  }

  addToCart(product: Product) {
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        // Add product to the cart
        this.cartService.init(); // array in cartService gets updated with new values 
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        // Remove product from the cart
        this.cartService.init(); // array in cartService gets updated with new values 
      });
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
