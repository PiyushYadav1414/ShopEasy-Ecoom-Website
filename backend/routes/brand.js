const express = require('express');
const router = express.Router();
const { addBrand, getBrands, getBrandById, updateBrand, deleteBrand } = require("../handlers/brand-handler");

// Fetch all brands
router.get('/', async (req, res) => {
    try {
        let result = await getBrands();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching brands', error: error.message });
    }
});

// Add a new brand
router.post('/', async (req, res) => {
    let model = req.body;
    try {
        let result = await addBrand(model);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Error creating brand", details: error.message });
    }
});

// Fetch a brand by ID
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await getBrandById(id);
        if (!result) {
            return res.status(404).send({ error: "Brand not found" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Error getting brand by ID", details: error.message });
    }
});

// Update a brand by ID
router.put('/:id', async (req, res) => {
 // put method can handle and support both (req.body of post request) and (req.params or req.query of get)   
    let model = req.body;
    let id = req.params.id;
    try {
        let result = await updateBrand(id, model);
        if (result.error) {
            return res.status(404).send(result);
        }
        res.send({ message: "Brand updated successfully", data: result });
    } catch (error) {
        res.status(500).send({ error: "Error updating brand", details: error.message });
    }
});

// Delete a brand by ID
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await deleteBrand(id);
        if (result.error) {
            return res.status(404).send(result);
        }
        res.send({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting brand", details: error.message });
    }
});

module.exports = router;
