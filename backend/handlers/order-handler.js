const Order = require('../db/order');

async function addOrder(userId, order) {
    try {
        // Creating a new order instance
        let newOrder = new Order({
            userId: userId,         // userId must be explicitly set
            date: order.date,       // Directly assign the date from the order object
            items: order.items,     // Assign items array from the order
            paymentType: order.paymentType,  // Directly assign paymentType
            address: order.address, // Assign address
            status: 'Order Confirmed',              // Assuming the initial status is 'pending'
            totalAmount: order.totalAmount
        });

        // Saving the order to the database
        await newOrder.save();
        console.log('Order added successfully');
    } catch (error) {
        console.error('Error adding order:', error);
        throw new Error('Failed to add order');
    }
}

// Ismein sirf ek particular customer ke order mileienge so customer id reqd
async function getCustomerOrders(userId) {
    try {
        // Fetching orders based on userId
        let orders = await Order.find({ userId: userId });

        // Returning the orders as plain objects
        return orders.map((x) => x.toObject());
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders');
    }
} 

// Ismein Admin ko Sabhi customer ke place kiye hue order mileinge so no need id
async function getOrders() {
    try {
        let orders = await Order.find();
        return orders.map((x) => x.toObject());
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error; // Rethrow the error to let the caller handle it
    }
}

async function updateOrderStatus(id, status) {
    try {
      await Order.findByIdAndUpdate(id, {
        status: status,
      });
      console.log(`Order with ID ${id} updated successfully to status: ${status}`);
    } catch (error) {
      console.error(`Error updating order status for ID ${id}:`, error);
      throw new Error('Failed to update order status');
    }
  }
  

module.exports = {addOrder,getCustomerOrders,getOrders,updateOrderStatus};
