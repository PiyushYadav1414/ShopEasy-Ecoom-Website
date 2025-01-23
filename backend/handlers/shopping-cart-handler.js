const Cart = require("../db/cart");

async function addToCart(userId, productId, quantity) {
  // Find the product in the cart for the given user and product
  let product = await Cart.findOne({ userId: userId, productId: productId });

  // If the product is already in the cart, update the quantity
  if (product) {
    await Cart.findByIdAndUpdate(product._id, {
      quantity: product.quantity + quantity, // Increment the quantity
    });
  } else {
    // If the product is not in the cart, create a new cart entry
    product = new Cart({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });

    // Save the new product to the cart
    await product.save();
  }
}




async function removeFromCart(userId, productId) {
    try {
      // Try to find and delete the cart item for the given user and product
      await Cart.findOneAndDelete({ userId: userId, productId: productId });
      console.log('Product removed from cart successfully');
    } catch (error) {
      // Catch and log any errors that occur during the operation
      console.error('Error removing product from cart:', error);
    }
  }
  
  async function getCartItems(userId) {
    try {
      // Try to fetch all products in the cart for the given user
      const products = await Cart.find({ userId: userId }).populate("productId");
      
      // Map the result to return an array of productId
      return products.map((x)=>{
        return { quantity: x.quantity, product: x.productId };
      })
      
      ;
    } catch (error) {
      // Catch and log any errors that occur during the operation
      console.error('Error fetching cart:', error);
      return [];  // Return an empty array in case of error 
    }
  }
  

  async function clearCart(userId) {
    try {
      // Deleting all cart items for the given userId
      await Cart.deleteMany({ userId: userId });
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing the cart:', error);
      throw new Error('Failed to clear cart');
    }
  }

  module.exports = { getCartItems, addToCart, removeFromCart,clearCart};
