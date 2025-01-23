// This library helps in generating tokens during login and verifying them during API requests.
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.header("Authorization"); // Fetch the token from the Authorization header
    console.log("token in middleware" + token);
    // If no token is provided, deny access
    if (!token) {
        return res.status(401).send({
            error: "Access denied",
        });
    }

    try {
// .verify Takes a token (sent by the client) and a secret key (known only to the server).Decodes the 
// token and checks its signature against the secret key to ensure it hasn’t been altered.If valid: Returns the decoded data (e.g., user ID, email).  
// Below line takes the token sent by the client and uses a secret key ("secret") that only the server knows to decrypt it and verify its authenticity.    
        const decode = jwt.verify(token, "secret"); // Use the secret key to decode the token
        console.log(decode);

// If the token is verified then server get some data like "name",email, password. Server adds the 
// decoded data to the request object (req.user = decode). This way, later parts of the code can easily
// access req.user to know who the user is and what their data is.
        req.user = decode;
        
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If verification fails, return an error
        return res.status(401).send({
            error: "Invalid token",
        });
    }
}




function isAdmin(req, res, next) {
    const user = req.user; // assuming the user info is stored in `req.user`, typically set by previous middleware (like JWT authentication)
    
    if (req.user && req.user.isAdmin) {
      next(); // If the user is an admin, proceed to the next middleware/route handler
    } else {
      return res.status(403).send({
        error: "Forbidden", // Send a 403 Forbidden error if the user is not an admin
      });
    }
  }
module.exports = { verifyToken,isAdmin };
// Here’s How It Works: ********* IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT *********

// ### Login and Token Storage:
// - When you log in, the server sends you a token. This token is stored in your **localStorage** in the browser.
// - The token acts like a **secret key** that tells the website, "Hey, this user is logged in and authorized to perform certain actions."

// ### Accessing Regular Pages:
// - You can freely visit **any page** of the website as long as the page doesn’t require special permission (e.g., viewing your profile or managing categories).
// - Why? Because the token is stored in your browser, and the website assumes you’re logged in as long as it knows about the token.

// ### Accessing Protected Pages:
// - **Protected pages** are those that only logged-in users should be able to visit (e.g., viewing user settings, admin dashboard, etc.).
// - To access these pages, the website checks if you have a **valid token**.
//     - If the token is stored in localStorage, it’s sent to the server for validation.
//     - If the token is valid, you’re allowed to visit the protected page.
//     - If the token is missing or invalid, you’re denied access and might be redirected to the login page.

// ### What Happens If You Visit a Protected Route?
// 1. When you try to visit a protected route (e.g., `/admin` or `/profile`), the website checks for the token stored in localStorage.
// 2. The token is sent along with the request to the server to confirm you're logged in.
// 3. **If the server verifies the token as valid**, you’ll be granted access to the protected page.
// 4. **If the server detects the token is expired or invalid**, it will block your access and prompt you to log in again.

// ### Example:

// Imagine you're building a shopping website with two types of pages:

// #### Public Pages (No login required):
// - **Home Page** (view products)
// - **Categories Page** (view categories of products)

// #### Protected Pages (Login required):
// - **User Profile** (see your personal details)
// - **Admin Dashboard** (manage categories, products, etc.)

// ### Steps:

// 1. **Login:**
//    - The user logs in successfully.
//    - The server sends back a **token**.
//    - The token is saved in the **browser's localStorage**.

// 2. **Visiting Public Pages:**
//    - The user can visit the **Home Page** or **Categories Page** without any login check, because these pages are publicly accessible.

// 3. **Visiting Protected Pages:**
//    - When the user tries to visit the **User Profile** or **Admin Dashboard**:
//      - The website checks **localStorage** for the token.
//      - If the token is found, it's sent to the server for verification.
//      - If the server confirms the token is valid, access is granted to the protected page.
//      - If the token is missing or invalid, the user is redirected to the login page.

// 4. **Token Expiry:**
//    - Tokens can expire after a certain period (e.g., 1 hour).
//    - If the token has expired, and the user tries to visit a protected page, the server will reject the expired token, logging the user out or redirecting them to the login page.

// When Making an HTTP Request (for example, when accessing a protected page like the user profile):
// You include the token in the HTTP headers. The most common way to send a token is in the Authorization header.


// getProfile() {
//     // Get the token from localStorage
//     const token = localStorage.getItem('token');
    
//     // If token exists, send the token in the Authorization header
//     if (token) {
//       this.http.get('/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`  // Adding token to the request headers
//         }
//       }).subscribe(response => {
//         console.log(response);  // The server response for the protected page
//       });
//     } else {
//       console.log('Token not found!');
//     }
//   }
  
// When the server receives the request, it looks for the Authorization header to check if the token is included.

// Server-Side Verification:
// The server checks if the token exists and if it's valid.
// If the token is valid, it proceeds with processing the request.
// If the token is missing or invalid, the server responds with an error and typically redirects to the login page.

// {
//     "id": "123456",
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "iat": 1672531200,  // iat: Token issue time.
//     "exp": 1672534800   // exp: Token expiration time.
// }
