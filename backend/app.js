const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/category')
const cors = require('cors');
const brandRoutes = require('./routes/brand')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const authRoutes= require("./routes/auth");
const { verifyToken,isAdmin } = require('./middleware/auth-middleware');



// Load environment variables from .env file
require('dotenv').config();

const port = process.env.PORT;

// Enable CORS for cross-origin requests
app.use(cors());
// we can send data in json format
app.use(express.json()); // // Parse incoming JSON data

// request jo bhi /category route ki hai use category.js file sambhalegi 
app.use("/category",verifyToken,isAdmin, categoryRoutes)
app.use("/brand",verifyToken,isAdmin, brandRoutes)
app.use("/orders",verifyToken,isAdmin, orderRoutes)
app.use('/product',verifyToken,isAdmin, productRoutes); // API endpoint for product routes
app.use('/customer',verifyToken, customerRoutes); // API endpoint for product routes
app.use("/auth", authRoutes); // Register the auth routes for user registration

// app.use("/category", categoryRoutes)
// app.use("/brand", brandRoutes)
// app.use('/product', productRoutes); // API endpoint for product routes
// app.use('/customer', customerRoutes); // API endpoint for product routes
// app.use("/auth", authRoutes); // Register the auth routes for user registration

//-------------------------------------------------------------------------------------------------------------------
//  METHOD 1: 
// const DataBase = 'mongodb://0.0.0.0:27017/e-comm-store-db'; // connection query

// mongoose.set('strictQuery', true); //This line makes sure that only the fields defined in your schema are used when you query the database.

// mongoose.connect(DataBase, { useNewUrlParser: true, useUnifiedTopology: true }); // connectiong to mongodb

// const db = mongoose.connection; // below represent the mongodb connection and we are assigning it to variable and by doing this we can check if the connection is successful or failed

// //This line listens for any connection errors
// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // below will run only once and This line listens for a successful connection.
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
//-------------------------------------------------------------------------------------------------------------------

// METHOD 2 :
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, });
        console.log('Connected to MongoDB');
    } catch (err) {
        // Handle any errors that occur during the connection attempt
        console.error('Error connecting to MongoDB:', err);
    }
}

// Call the connectDb function
connectDb();






app.get('/', (req, res) => {
    console.log(req.url);
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.send("<h1>Hello From h1 tag of app.js </h1>")
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


// async: When a function is marked as async, it means that the function will always return a Promise, and it 
// allows you to use the await keyword inside that function.

// await: The await keyword is used to pause the execution of an async function until a Promise is resolved 
// (or rejected). It makes your code behave like it is synchronous, even though it's asynchronous.

// async/await simplifies this by allowing us to write asynchronous code as if it were synchronous. It makes the
//  code easier to read, write, and maintain.

// Promise is a way of handling asynchronous operations in JavaScript. It represents a value that may not be available yet but will be at some point in the future.

// async: Marks the function as asynchronous, and it will automatically return a Promise.
// await: Pauses the execution of the function until the Promise is resolved or rejected.


// async/await makes asynchronous code look simple and readable like normal synchronous code. But it still allows 
// the program to keep running while waiting for tasks like server calls or file reading.