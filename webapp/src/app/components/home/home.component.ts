import { Component, OnInit} from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Product } from 'src/app/types/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private customerService: CustomerService, private wishlistService: WishlistService,private cartService: CartService){

  }
  newProducts: Product[] = []; 
  featuredProducts: Product[] = [];
  bannerImages: any = [
    { _id: '677040f8d6a381e4a8ec7087', name: 'LOOSE-FIT BLAZER', images: 'https://image.hm.com/assets/hm/dc/55/dc55fa6865b1c5fb3c39a692e4b25cd274157710.jpg?imwidth=1536' },
    { _id: '6770453fd6a381e4a8ec7105', name: 'SLIM FIT SINGLE-BREASTED JACKET', images: 'https://image.hm.com/assets/hm/ab/90/ab9056113ea5bf3361a0cd0d2eca4134f02cd2dc.jpg?imwidth=400' },
    { _id: '67704418d6a381e4a8ec70e6', name: 'TAPERED DRESS PANTS', images: 'https://image.hm.com/assets/hm/a8/a1/a8a115dbc8ca63c09fb3394a5de18e15a562f545.jpg?imwidth=657' },
    { _id: '6770435ad6a381e4a8ec70dc', name: 'WIDE-LEG PANTS', images: 'https://image.hm.com/assets/hm/af/9e/af9ee3341a3f104cb59ba6328b8c35132311483a.jpg?imwidth=657' },
    { _id: '6770407dd6a381e4a8ec7082', name: 'LOOSE FIT PRINTED HOODIE', images: 'https://image.hm.com/assets/hm/6b/44/6b44f200a9d73830e3a7637aa68236c0c9aa36a3.jpg?imwidth=1536' },
    { _id: '677043a0d6a381e4a8ec70e1', name: 'BELTED SHIRT DRESS', images: 'https://image.hm.com/assets/hm/a6/80/a6808f1eb994f854cf5a4b2f567a075b3d59c076.jpg?imwidth=657' }
];


  bannerImage2:Product[] = [];
  currentSlideIndex: number = 0;

  bannerImage3: string[] = [
    'https://img.ltwebstatic.com/images3_ccc/2024/12/23/8f/17349220772bc4abc17ce50cc54732887d432285fc.jpg',
    'https://img.ltwebstatic.com/images3_ccc/2024/12/23/6c/17349222000fff79168c124e8412aa044e8d025022.jpg',
    'https://img.ltwebstatic.com/images3_ccc/2024/12/23/74/1734922223ab2911eab60ea74a61edfdecbe0aa93b.jpg',
    'https://m.media-amazon.com/images/I/71T6bK2gu7L._SX3000_.jpg',
    'https://aimg.kwcdn.com/cart/1f19348ae20/7b171042-2ebe-43fe-8750-b1a8a47774a4.jpeg?imageView2/q/100!/format/webp',
    'https://img.ltwebstatic.com/images3_ccc/2024/12/18/71/173452223663ea9df206f2d0b1e970150ca043e0ab.jpg'
  ];

  moveSlide(direction: number) {
    const totalSlides = this.bannerImages.length;
    this.currentSlideIndex =
      (this.currentSlideIndex + direction + totalSlides) % totalSlides;
  }
  

  // Owl Carousel custom options
  customOptions: OwlOptions = {
    loop: true,  // Loop the carousel
    margin: 10,  // Set margin between items
    nav: true,  // Disable navigation
    dots: true,  // Show dots navigation
    items: 3,  // Display 3 items per slide
    autoplay: true,  // Enable autoplay
    autoplayTimeout: 3000,  // Time between image transitions (2 seconds)
    autoplayHoverPause: true,  // Pause autoplay when the mouse hovers over the carousel
    navSpeed: 700,  // Speed of navigation
    responsive: {
      0: {
        items: 1,  // Show 1 item on small screens
      },
      600: {
        items: 2,  // Show 2 items on medium screens
      },
      1000: {
        items: 3,  // Show 3 items on large screens
      }
    }
  };

  ngOnInit(): void {

    // Fetching featured products
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log(this.featuredProducts);
      this.bannerImage2.push(...result);
      
    });
     // Fetching new products
     this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      console.log(this.newProducts);
      this.bannerImage2.push(...result);
    
    });
// Jese hi hmara project load hoga server se cart items and favourite items user ki load ho jayeingi hmari memory mein
    this.wishlistService.init();
    this.cartService.init();
  }


  addToCart(product: Product) {
    console.log(product); // Log the product for debugging
  
    // Check if the product is already in the cart
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        console.log(`Product ${product._id} added to cart.`);
        this.cartService.items.push({ product, quantity: 1 }); // Update the local cart items
      });
    } else {
      console.log(`Product ${product._id} is already in the cart.`);
    }
  }
  
  isProductInCart(productId: string): boolean {
    // Check if the product exists in the cart items
    if (this.cartService.items.find((item) => item.product._id === productId)) {
      return true; // Explicit return for true
    } else {
      return false; // Explicit return for false
    }
  }
  




}
