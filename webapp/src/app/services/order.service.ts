import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';  // Importing the environment file
import { Order } from '../types/order'; // Importing the Order model (update the path as necessary)

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;  // Using the base URL from environment

  constructor(private http: HttpClient) { }

  // API calls using the base URL
  addOrder(order: Order) {
    return this.http.post(`${this.baseUrl}/customer/order`, order);  // Using the base URL for API call
  }

   // Get customer orders
   getCustomerOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/customer/orders`);  // Fetching orders from the API
  }
 
   // Get admin orders
   getAdminOrder() {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`); // Fetching admin orders
  }

  // Update order status
  updateOrderStatus(id: string, status: string) {
    return this.http.post(`${this.baseUrl}/orders/${id}`, {
      status: status,  // Sending status as object to update so we will retrieve it using req.body
    });
  }



}
