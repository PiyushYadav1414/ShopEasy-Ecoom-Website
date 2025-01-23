const Product = require("../db/product"); // Import the Product model


// Function to get all products
async function getProducts() {
    try {
        const products = await Product.find();

        // Convert each document to a plain JavaScript object
        return products.map(p => p.toObject());
    } catch (error) {
        return { error: "Error retrieving products", details: error };
    }
}


// Function to add a new product
async function addProduct(model) {
    const product = new Product({
        name: model.name,
        shortDescription: model.shortDescription,
        description: model.description,
        price: model.price,
        discount: model.discount,
        images: model.images,
        categoryId: model.categoryId, // Associate the product with a category
        brandId: model.brandId,
        isFeatured: model.isFeatured,
        isNewProduct: model.isNewProduct
    });

    try {
        await product.save();
        return product.toObject(); // Return the saved product as a plain JavaScript object
    } catch (error) {
        return { error: "Error saving product", details: error };
    }
}



// Function to get a product by ID
async function getProductById(id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return { error: "Product not found" };
        }
        return product.toObject(); // Convert to a plain JavaScript object
    } catch (error) {
        return { error: "Error retrieving product", details: error };
    }
}

// Function to update an existing product
async function updateProduct(id, model) {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id }, // Match the document by ID
            model,       // Update with the new data
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return { error: "Product not found" };
        }

        return updatedProduct.toObject(); // Convert to a plain JavaScript object
    } catch (error) {
        return { error: "Error updating product", details: error };
    }
}

// Function to delete a product
async function deleteProduct(id) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Find and delete the document by ID
        if (!deletedProduct) {
            return { error: "Product not found" };
        }
        return { message: "Product deleted successfully" };
    } catch (error) {
        return { error: "Error deleting product", details: error };
    }
}

// Function to get new products
async function getNewProducts() {
    let newProducts = await Product.find({
        isNewProduct: true,
    });
    return newProducts.map((x) => x.toObject());
}

// Function to get featured products
async function getFeaturedProducts() {
    let featuredProducts = await Product.find({
        isFeatured: true,
    });
    return featuredProducts.map((x) => x.toObject());
}

// The function getProductForListing fetches products from a database. It filters the products based on: A 
// search term (e.g., "laptop"). A category ID (e.g., "electronics").Pagination (to control which page of results
// you want and how many results to show per page).Sorting (to order the products, like by price).
// below are default vlues given to function if some args are not provided by user so default value will be used
async function getProductForListing(searchTerm, categoryId, page , pageSize ,sortBy, sortOrder,brandId) {
// queryFilter is an empty object.Later in the code, keys and values are added to queryFilter based on the 
// conditions (if (searchTerm) and if (categoryId)).
    

    if (!sortBy) {
        sortBy = "price";
      }
      
      if (!sortOrder) {
        sortOrder = -1;
      }
      let queryFilter = {};
      
// 1). $regex (Regular Expression): It’s like a smart search tool. It allows searching for text that partially matches the searchTerm.
// For example: If searchTerm = "shoe", it will match product names like:"Shoes","shoe rack","snowshoe".

// 2). $options: "i":
// This makes the search case-insensitive. It means it doesn’t matter if the letters are uppercase or lowercase.
// For example:If searchTerm = "Shoe", it will still match:"shoe","SHOE","Shoe rack"      

//This code checks if the user has typed something in the search box (searchTerm). If they did,the code adds a 
//name property to the queryFilter object. The value assigned to queryFilter.name is a special rule (not just plain text)
if (searchTerm) {
    queryFilter.$or = [
        { name: { $regex: '.*' + searchTerm + '.*', $options: "i" } }, 
        { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: "i" } }
    ];//Pros: This ensures that the searchTerm can match any part of the name field or shortDescription (start, middle, or end).
}
//This code checks if the user has provided categoryId to search item. If they did,the code adds a 
//name property to the queryFilter object. 
    if (categoryId) {
        queryFilter.categoryId = categoryId;
    }

    if (brandId) {
        queryFilter.brandId = brandId;
    }

    console.log("queryFilter"+queryFilter);

    
//The .skip((page - 1) * pageSize) is used to skip the products that have already been shown on previous pages.
// Eg=> Page1 will fetch product from db and will not skip any product as it will show first 10 product from db.Eg=> (page - 1) * pageSize = (1 - 1) * 10 = 0
// Bt Page 2 will skip those product which have shown on page 1 and will fetch and show new products from db.Eg=>page - 1) * pageSize = (2 - 1) * 10 = 10

    try {
        // Fetch products with filters, sorting, pagination
        const products = await Product.find(queryFilter) //Finds products that match the filters in queryFilter.
            .sort({ [sortBy]: +sortOrder }) // Sort by price in descending order to to -1
            .skip((+page - 1) * +pageSize) //is used to skip the products that have already been shown on previous pages.
            .limit(+pageSize); // Limit the number of products to show on single page

        // Return plain JavaScript objects
        return products.map(x => x.toObject());
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Propagate the error for higher-level handling
    }
}




// Export the functions
module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getNewProducts, getFeaturedProducts,getProductForListing };
