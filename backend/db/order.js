const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // User ID reference
  date: { type: Date, required: true },  // Date when the order was placed.It helps keep track of when the order was created.
// This is an array that holds the items in the order.The Mixed type is used here to allow flexibility, as items 
// can have varying structures. For example, the items might include the product name, quantity, price, or other data.
  items: { type: [mongoose.Schema.Types.Mixed], required: true }, // List of items in the order (any type of data)
  paymentType:String,
  address: mongoose.Schema.Types.Mixed,
  totalAmount:Number,
  status: { type: String, required: true },   // Status of the order (e.g., 0: pending, 1: completed,2: Order shipped etc.)
 
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
 