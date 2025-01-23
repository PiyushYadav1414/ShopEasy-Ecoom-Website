import { CartItem } from './cartItem';

export interface Order {
    _id?: string;  
  items: CartItem[];       // List of cart items
  paymentType: string;     // Type of payment (e.g., credit card, PayPal)
  address: any;            // Shipping address, can be further typed based on your structure
  date: Date;              // Date the order was placed
  totalAmount: number;     // Total amount of the order
  status?: string;         // Optional property for tracking the status of the order (e.g., 'Inprogress', 'Shipped')
}
