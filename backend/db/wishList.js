const mongoose = require('mongoose');

// Define the schema for the 'Wishlist' collection
const wishListSchema = new mongoose.Schema({
 //You can use the userId to fetch the wishlist items  that user has added to their wishList.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // User ID reference

// we can use these product IDs to retrieve the product details from the products collection (product.js)
  productId: { type: mongoose.Types.ObjectId, ref: 'products' }

});


const Wishlist = mongoose.model('wishlists', wishListSchema);


module.exports = Wishlist;
