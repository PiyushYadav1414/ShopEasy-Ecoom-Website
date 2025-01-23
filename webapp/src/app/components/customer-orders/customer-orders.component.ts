import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service'; // Import your OrderService
import { Order } from 'src/app/types/order';
import { CartItem } from 'src/app/types/cartItem';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  orders: Order[] = [];  // Array to hold customer orders

  // Injecting the OrderService into the component
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Fetch customer orders when the component initializes
    this.orderService.getCustomerOrders().subscribe(
      (result) => {
        this.orders = result;  // Populate the orders array with the fetched data
        console.log(this.orders);  // Optionally log the fetched orders for debugging
      },
      (error) => {
        console.error('Error fetching orders:', error);  // Log any errors
      }
    );
  }

  getSellingPrice(item: CartItem): number {
    return parseFloat(
      (item.product.price - (item.product.price * item.product.discount) / 100).toFixed(2)
    );
  }

  getStatusBarWidth(status: any): string {
    switch (status) {
      case 'Order Confirmed':
        return 'width-0';
      case 'Shipped':
        return 'width-33';
      case 'Out For Delivery':
        return 'width-66';
      case 'Delivered':
        return 'width-100';
      default:
        return 'width-0';
    }
  }
  
  

  // Function to get the appropriate CSS class for the order status
  getStatusClass(status: any): string {
    switch (status) {
      case 'Order Confirmed':
        return 'text-red-500';
      case 'Shipped':
        return 'text-yellow-500';
      case 'Out For Delivery':
        return 'text-blue-500';
      case 'Delivered':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }

  isStatusActive(currentStatus: any, stepStatus: string): boolean {
    const statuses = ['Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered'];
    return statuses.indexOf(currentStatus) >= statuses.indexOf(stepStatus);
  }
}
