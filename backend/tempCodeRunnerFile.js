const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

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
    await mongoose.connect('mongodb://localhost:27017/e-comm-store-db', { useNewUrlParser: true, useUnifiedTopology: true, });
    console.log('Connected to MongoDB');
}

connectDb.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

connectDb();


app.get('/', (req, res) => {
    console.log(req.url);
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.send("<h1>Hello From h1 tag</h1>")
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})



