const express = require("express");
const router = express.Router();
const Category = require("../db/category");
const { addCategory, updateCategory,deleteCategory,getCategories,getCategoryById } = require("../handlers/category-handler"); // Assuming these functions are in services/category.js

// POST route to create a new category
router.post("/", async (req, res) => {
    const model = req.body; // Getting the category data from the request body

    try {
        let result = await addCategory(model);
        res.send(result); // Send the result (success or error message)
    } catch (error) {
        res.status(500).send({ error: "Error creating category", details: error });
    }
});


router.get('/', async (req, res) => {
    try {
      // Await the result of the getCategories function, which fetches data
      let result = await getCategories();
  
      // Send the result as the response
      res.send(result);
    } catch (error) {
      // If there's an error, send a 500 response with the error message
      res.status(500).send({ message: 'Error fetching categories', error: error.message });
    }
  });


  router.get("/:id", async (req, res) => {
    let id = req.params.id;  // Corrected the syntax to access the 'id' from the request parameters
    let result = await getCategoryById(id);
    res.send(result);  // Sending the result as the response
  });
  


// PUT route is used to update an existing category
router.put("/:id", async (req, res) => {
    const model = req.body; // It will give {"name": "Electronics"} which is set by user
    const id = req.params.id; // Get the ID from the request parameters

    try {
        let result = await updateCategory(id, model); // Call the updateCategory function

        if (result.error) {
            // If the updateCategory function returns an error
            res.status(404).send(result);
        } else {
            res.send({ message: "Category updated successfully", data: result });
        }
    } catch (error) {
        res.status(500).send({ error: "Error updating category", details: error });
    }
});

//router.delete() is used because we are deleting a resource
router.delete("/:id", async (req, res) => {
    let id = req.params.id; // Get the ID from the request parameters

    // Call deleteCategory function and await its response
    const result = await deleteCategory(id);

    // If there's an error, respond with the error
    if (result.error) {
        return res.status(404).send(result);
    }

    // If successful, send a success message
    res.send({ message: "deleted" });
});


module.exports = router;



// Create → POST
// Read → GET
// Update → PUT or PATCH
// Delete → DELETE
