import { Component, OnInit } from '@angular/core'; // Import OnInit
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/types/order';
import { CartItem } from 'src/app/types/cartItem';
import { MatButtonToggleChange } from '@angular/material/button-toggle'; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit { // Implement OnInit

  orders: Order[] = []; // Initialize orders array

  constructor(private orderService: OrderService) {}

  // Lifecycle hook to initialize component data
  ngOnInit() {
    this.orderService.getAdminOrder().subscribe(
      (result) => {
        this.orders = result; // Assign the fetched orders to the orders array
      },
      (error) => {
        console.error('Error fetching admin orders:', error); // Log errors
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

    statusChanged(event: MatButtonToggleChange, order: Order) {
      console.log(event.value);
      
      this.orderService.updateOrderStatus(order._id!, event.value).subscribe(
        (result) => {
          alert('Order status updated');
          order.status = event.value; // Update the local order status
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    }
    
}
