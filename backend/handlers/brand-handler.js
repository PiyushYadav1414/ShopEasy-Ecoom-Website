const Brand = require("../db/brand"); // Import the Brand model

// Function to add a new brand
async function addBrand(model) {
    const brand = new Brand({ name: model.name,selected: model.selected });

    try {
        await brand.save();
        return brand.toObject(); // Return the saved brand as a plain JavaScript object
    } catch (error) {
        return { error: "Error saving brand", details: error };
    }
}

// Function to get all brands
async function getBrands() {
    let brands = await Brand.find(); // Fetch all brand documents
    return brands.map(b => b.toObject()); // Convert each document to a plain JavaScript object
}

// Function to get a brand by ID
async function getBrandById(id) {
    try {
        const brand = await Brand.findById(id); // Find the brand by ID
        if (!brand) return { error: "Brand not found" };
        return brand.toObject(); // Convert to a plain JavaScript object
    } catch (error) {
        return { error: "Error retrieving brand", details: error };
    }
}

// Function to update an existing brand
async function updateBrand(id, model) {
    try {
        const updatedBrand = await Brand.findOneAndUpdate(
            { _id: id }, // Match the document by ID
            model,       // Update with the new data
            { new: true } // Return the updated document
        );

        if (!updatedBrand) {
            return { error: "Brand not found" };
        }

        return updatedBrand.toObject(); // Return the updated brand as a plain JavaScript object
    } catch (error) {
        return { error: "Error updating brand", details: error };
    }
}

// Function to delete a brand
async function deleteBrand(id) {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id); // Find and delete the document by ID
        if (!deletedBrand) {
            return { error: "Brand not found" };
        }
        return { message: "Brand deleted successfully" };
    } catch (error) {
        return { error: "Error deleting brand", details: error };
    }
}


// Export the functions 
module.exports = { addBrand, getBrands, getBrandById, updateBrand, deleteBrand };





