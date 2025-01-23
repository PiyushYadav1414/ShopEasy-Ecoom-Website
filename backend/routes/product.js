const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../handlers/product-handler"); // Import the product handlers


// Fetch all products
router.get('/', async (req, res) => {
    try {
        let result = await getProducts();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error: error.message });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    let model = req.body;
    try {
        let result = await addProduct(model);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Error creating product", details: error.message });
    }
});

// Fetch a product by ID
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await getProductById(id);
        if (!result || result.error) {
            return res.status(404).send({ error: "Product not found" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Error getting product by ID", details: error.message });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    let model = req.body;
    let id = req.params.id;
    try {
        let result = await updateProduct(id, model);
        if (result.error) {
            return res.status(404).send(result);
        }
        res.send({ message: "Product updated successfully", data: result });
    } catch (error) {
        res.status(500).send({ error: "Error updating product", details: error.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await deleteProduct(id);
        if (result.error) {
            return res.status(404).send(result);
        }
        res.send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting product", details: error.message });
    }
});


module.exports = router;
