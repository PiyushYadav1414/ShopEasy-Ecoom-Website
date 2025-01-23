import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/types/cartItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items: CartItem[] = [];
  orderStep: number = 0;
  checkoutForm!: FormGroup;
  paymentType: string = '';
  isCartEmpty: boolean = true; // Flag to track if the cart is empty


  constructor(private cartService: CartService, private fb: FormBuilder, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe((res) => {
      this.items = res;
      this.updateCartStatus(); // Check cart status when the component initializes
    });

    this.checkoutForm = this.fb.group({
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      province: ['', Validators.required],
      pincode: ['', [Validators.required,]] //Validators.pattern('^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$')
    });

  }

  // Check if the cart is empty and update the status
  updateCartStatus() {
    this.isCartEmpty = this.items.length === 0;
  }


  changeQuantity(productId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      setTimeout(() => {
        this.cartService.removeFromCart(productId).subscribe(() => {
          this.items = this.items.filter(item => item.product._id !== productId);
          this.updateCartStatus();
        });
      }, 100);
      return;
    }

    const item = this.items.find(item => item.product._id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.cartService.addToCart(productId, newQuantity);
      this.updateCartStatus(); // Update cart status after quantity change
    }
  }

  getSellingPrice(item: CartItem): number {
    return parseFloat(
      (item.product.price - (item.product.price * item.product.discount) / 100).toFixed(2)
    );
  }


  // Get the subtotal of the items in the cart
  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getDiscount(): number {
    if (this.isCartEmpty) return 0;
    return this.items.reduce((sum, item) =>
      sum + (item.product.price * item.product.discount / 100) * item.quantity, 0);
  }

  getDiscountAmount(): number {
    return this.getDiscount();
  }


  // Calculate the total amount dynamically
  getTotal(): number {
    if (this.isCartEmpty) return 0;
    return this.getSubtotal() - this.getDiscount() + 3 + 10;
  }

  // Reset the cart (empty the cart and update the status)
  clearCart() {
    this.items = [];
    this.updateCartStatus();
  }



  checkout() {
    this.orderStep = 1;
  }

  proceedToCheckout() {
    if (this.checkoutForm.valid) {
      // Proceed with the checkout process
      console.log('Checkout details:', this.checkoutForm.value);
    }
    this.orderStep = 2;
  }

  completeOrder() {
    // Create the order object
    let order = {
      items: this.items,
      paymentType: this.paymentType,
      address: this.checkoutForm.value,
      date: new Date(),
      totalAmount: this.getTotal() // Use the getTotal method to calculate the total amount
    };

    // Log the order details to console (you can remove this line after confirmation)
    console.log(order);

    // Calling the addOrder method from the OrderService and handling the response
    this.orderService.addOrder(order).subscribe(
      (result) => {
        alert('Your order is completed');

        // Reset cart and order data
        this.resetOrderData();
        // this.cartService.init();  



        // Reset step after order completion
        this.orderStep = 0;
        this.router.navigateByUrl('/orders');

      },
      (error) => {
        alert('There was an error processing your order');
        console.error(error);
      }
    );
  }

  resetOrderData() {
    this.cartService.init();  // Clear the cart items
    this.items = [];  // Reset the cart items array
    this.paymentType = '';  // Reset payment type
    this.checkoutForm.reset();  // Reset the checkout form
    this.isCartEmpty = true;
  }
}







