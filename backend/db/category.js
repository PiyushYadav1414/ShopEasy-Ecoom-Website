const mongoose = require("mongoose");

// category on website consist of like "Electronics", "Books", "Furniture", etc.
const categorySchema = new mongoose.Schema({
    name: String,  // This will store the category name
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
