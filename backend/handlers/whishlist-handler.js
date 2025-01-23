const Wishlist = require("../db/wishList");


// Is proctId wale product ko iss userId wale User ki wishList mein Add kr do
async function addToWishlist(userId, productId) {
  const wishlist = new Wishlist({
    userId: userId,
    productId: productId
  });

  await wishlist.save();  
  return wishlist.toObject();
}

// Is proctId wale product ko iss userId wale User ki wishList mein se Remove kr do
async function removeFromWishlist(userId, productId) {
    await Wishlist.deleteMany({userId: userId, productId: productId});
  }
  
// Iss userId wale User ki wishList mein uske saare product daal do jo usne wishList mein dale the
  async function getWishlist(userId) {
    let wishlists = await Wishlist.find({ userId: userId }).populate('productId')  //.populate('productId');
    return wishlists.map(x => x.toObject().productId);  //.productId
  }

//*******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT
//Each item in the Wishlist contains a reference to a Product through the productId. This means, in the
// Wishlist collection, instead of storing the whole product's data (like name, price, etc.), you're
// storing just the product's unique ID (like a reference to the Product document). 
// populate('productId'): This tells Mongoose to replace the productId in the Wishlist with the actual 
// product details from the Product collection.

//   {
//     userId: "user456",
//     productId: "product123"  // Just the product ID
//   }

//   {
//     userId: "user456",
//     productId: {            // This is now an object, not just the product ID
//       _id: "product123",
//       name: "Laptop",
//       price: 1000
//     }
//   }

//.productId is just how you access the populated data (the full product object). So, you use .map(x => x.toObject().productId) to get the product information and return it.
//*******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT
  
// Export the functions
module.exports = { addToWishlist,removeFromWishlist,getWishlist };
