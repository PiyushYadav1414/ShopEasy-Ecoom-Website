const { model } = require("mongoose");
const User = require("../db/user");

// bcrypt is a library used to securely store passwords in a database. Instead of storing the password as 
// plain text (e.g., "12345"), bcrypt converts it into a hash, a scrambled version of the password.
const bcrypt = require("bcrypt"); 
const jwt = require('jsonwebtoken');//This library helps in generating tokens during login and verifying them during API requests.


// Function to register a new user
async function registerUser(model) {
//10 is the salt rounds, meaning how many times the hashing process runs. A higher number is more secure 
// but slower.The hashed password is what gets stored in the database, not the plain password.
    const hashPassword = await bcrypt.hash(model.password, 10);
    
    // Create a new user object
    let user = new User({ name: model.name, email: model.email, password: hashPassword });
    
    // Save the user to the database
    await user.save();
}



async function loginUser(model) {
    //Getting user from his email id 
    const user = await User.findOne({ email: model.email }); 
    if (!user) {
        return null; // User not found
    }
    console.log(user, model.password, user.password);

    // in below we call the compare function of bcrypt which will compare the plain and encrypted passwords and will give True or false
    const isMatched = await bcrypt.compare(model.password, user.password);
    if (isMatched) {
// Generate JWT token.Tokens let users stay logged in without having to enter their password every time.
// Each request from the user includes the token, which the server verifies.
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            "secret",//The server signs the JWT token with the "secret".Later, when the server gets the token back (e.g., during a request), it verifies the token using the same "secret".
            { expiresIn: "5h" } // Optional: Token expiration time
        );
       
        return { token, user };
    } else { 
        return null; // Password mismatch
    }
}


module.exports = { registerUser,loginUser };  // Make sure registerUser is exported this way
