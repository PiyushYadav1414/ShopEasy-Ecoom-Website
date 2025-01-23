const mongoose = require("mongoose");

// Define the schema for a "Cart" collection
const cartSchema = new mongoose.Schema({
    
//type: Schema.Types.ObjectId: This means the field will store a special ID type called ObjectId
//ObjectId => MongoDB uses ObjectId as a unique identifier for each document (similar to a primary key in SQL).
//When you save a document in MongoDB, it automatically creates this unique ID.
//ref: 'users': => This tells Mongoose that the ObjectId stored in this cart field refers to a object in the users 
// collection and by doing this we can fetch all details of any user from User collection instead of copy pasting everytime.
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // References a user
    
    productId: { type: mongoose.Types.ObjectId, ref: 'products' }, // Stores an list (array) of product IDs as strings added to the cart as we can add more than one product and each product has its own ID
    quantity: Number
});

// Create a model based on the schema
const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart; 

// With ref: 'users', the userId field in the cart knows it points to the users collection. Using populate, you
//  can easily fetch both the cart and the related user details
