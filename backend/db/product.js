const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name:  String,               // Product name (e.g., "Laptop")
  shortDescription: String ,                    // Short description of the product
  description:  String ,                         // Detailed description of the product
  price: Number,       // Price at which the product was purchased
  discount: Number,        // Price at which the product is sold to customers
  images: Array(String),                            // Array of image URLs or paths for the product
  //It allows you to associate each product with a category (e.g., "Electronics", "Clothing").
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },  // Reference to the Category model
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'brands'},
  isFeatured:Boolean,
  isNewProduct: Boolean
}); 

// Create a model for the 'products' collection
const Product = mongoose.model('products', productSchema);

// Export the Product model for use in other files
module.exports = Product;
