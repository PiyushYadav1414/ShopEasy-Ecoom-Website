const express = require("express");
const { getNewProducts, getFeaturedProducts,getProductForListing,getProductById } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const router = express.Router();
const { getBrands} = require("../handlers/brand-handler");
const { getWishlist,removeFromWishlist,addToWishlist  } = require('../handlers/whishlist-handler');
const {getCartItems, addToCart, removeFromCart,clearCart} = require('../handlers/shopping-cart-handler');
const {addOrder,getCustomerOrders} = require('../handlers/order-handler');

// *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT

// is page mein wo function hai jo hum customer ko dikhana chahte hai Home page mein from home component.
// Yeh below function customer access nhi kr skta inke original routes se kyuinki wo isAdmin nhi hai toh
// uss route ke saare function accessable nhi hai usko liek categgories ke toh uske kuch function yhain
// iss file mein separate kr diye hai takki sirf yeh customer access kr le bakki nhi .nhi toh wo 
// http://localhost:4200/admin/products or http://localhost:4200/admin/brands or 
//  http://localhost:4200/admin/categories pe jake hmari website chnage kr payegi fully....

// *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT

router.get("/new-products", async (req, res) => {
  try {
    const products = await getNewProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Error fetching new products", error });
  }
});

router.get("/featured-products", async (req, res) => {
  try {
    const products = await getFeaturedProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Error fetching featured products", error });
  }
});

router.get('/categories', async (req, res) => {
    let categories = await getCategories();
    res.send(categories);
 
});


router.get('/brands', async (req, res) => {
  let brands = await getBrands();
  res.send(brands);

});


router.get("/products", async (req, res) => {
  try {
    
// On the client-side (query string): When the request is made from the client 
// (e.g., /products?searchTerm=shoes&categoryId=123),the query parameters are extracted from req.query. You 
// provide default values there to handle cases when sortBy or sortOrder are missing.   
const { searchTerm , categoryId , sortBy , sortOrder , brandId , pageSize , page } = req.query;//get val from like aboveQuery
    
    // Fetch categories (assuming getCategories is a function that returns a list of categories)
    const products = await getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId);
    // searchTerm: string, categoryId: string, sortBy: string, sortOrder: number, brandId: string, page: number, pageSize: number
    // Log or process the categories (You can fetch products here if needed)
    console.log("Categories fetched:", products); 

    // Example response with categories
    res.send(products); // You can replace this with logic to fetch products based on query parameters

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: "Failed to fetch products or categories." });
  }
});


router.get('/product/:id', async (req, res) => {
  const id = req.params.id;  // Correctly accessing the 'id' from the route parameters
  try {
    // Fetch product details using the id
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);  // Sending the product as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});


router.get("/wishlists", async (req, res) => {
  console.log(req.user); // We have added user in req from snippet after verifying token in auth.js
  const userId= req.user.id;  
  const items = await getWishlist(userId); // Fetch wishlist items using the userId
  res.send(items); // so we have user already and req.user means user. 
});
  

router.post("/wishlists/:id", async (req, res) => {
  console.log(req.user);
  
  const userId = req.user.id;
  const productId = req.params.id; // Getting productId
  
  try {
    const item = await addToWishlist(userId, productId);
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});


router.delete("/wishlists/:id", async (req, res) => {
  console.log(req.user); // Log the user information
  const userId = req.user.id; // Get the user ID from the request object
  const productId = req.params.id; // Get the product ID from the URL parameters

  try {
    await removeFromWishlist(userId, productId); // Call the function to remove the product from the wishlist
    res.send({ message: "ok" }); // Send a success response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Error removing item from wishlist" }); // Send an error response
  }  
});



router.get("/carts", async (req, res) => {
  try {
    console.log(req.user); // Log the user object for debugging
    
    // Retrieve the userId from the request object (assuming req.user is populated)
    const userId = req.user.id;
    
    // Fetch the cart items for the user
    const items = await getCartItems(userId);
    
    // Send the fetched items as the response
    res.send(items);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching cart items:', error);
    res.status(500).send({ message: 'Error fetching cart items' });
  }
});



router.post("/carts/:productId", async (req, res) => {
  try {
    console.log(req.user);
    
    const userId = req.user.id; // Get user ID from the request
    const productId = req.params.productId; // Correctly access productId from params
    const quantity = req.body.quantity; // Access quantity from the body

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ msg: "Invalid quantity provided" });
    }

    const items = await addToCart(userId, productId, quantity); // Call your addToCart function
    res.status(200).send(items); // Respond with the updated cart
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong while adding to cart" });
  }
});


router.delete("/carts/:productId", async (req, res) => {
  try {
    console.log(req.user); // Log the user object for debugging

    // Retrieve the userId from the request object
    const userId = req.user.id;

    // Retrieve the productId from the route parameter
    const productId = req.params.productId;
 
    // Call the function to remove the item from the cart
    const items = await removeFromCart(userId, productId);

    // Send the updated cart items as the response
    res.send(items);
  } catch (error) {
    // Log and handle any errors
    console.error("Error removing item from cart:", error);
    res.status(500).send({ message: "Error removing item from cart" });
  }
});


router.post("/order", async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user ID is in the request's user object (e.g., from authentication middleware)
    const order = req.body;      // Order data from the request body

    // Adding the order
    await addOrder(userId, order);

    // Clearing the cart for the user
    await clearCart(userId);

    // Sending response after successful order creation and cart clearing
    return res.send({message: "Order Created and Cart Cleared"});
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).send({message: 'Failed to process order',error: error.message});
  }
});


// Define the route to fetch customer orders
router.get("/orders", async (req, res) => {
  try {
    const userId = req.user.id; 
    const orders = await getCustomerOrders(userId); // Fetch customer orders from the database or service
    return res.send(orders);  // Send the orders as a response

  } catch (error) {
    console.error(error);
    // Send an error response
    return res.status(500).json({ message: "An error occurred while fetching orders.", error: error.message });
  }
});




module.exports = router;
