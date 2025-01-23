const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../handlers/auth-handler");


// POST route for user registration
router.post("/register", async (req, res) => {
    let model = req.body;

    // Check if name, email, and password are provided
    if (model.name && model.email && model.password) {
        // TODO: Handle registration logic, e.g., save user to the database
        await registerUser(model);
        res.send({
            message: "User registered successfully"
        });
    } else {
        res.status(400).json({
            error: "Please provide name, email, and password",
        }); // Send a 400 error with the message if no result is found
    }

});


router.post("/login", async (req, res) => {
    let model = req.body;

    if (model.email && model.password) {
        // Handle the login logic here (e.g., check credentials in the database)
        const result = await loginUser(model);
        if (result) {
            res.send(result); // If loginUser returns a result (token and user data), send it back
        } else {
            res.status(400).json({
                error: "Email or password is incorrect", // If loginUser returns null, send an error response
            });
        }

    } else {
        res.status(400).json({ error: "Please provide email and password" });
    }
});

module.exports = router;
