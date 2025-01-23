const Category = require("../db/category"); 

// Function to add a new category
async function addCategory(model) {
    // Create a new Category document
    const category = new Category({ name: model.name });

    try {
        // Save the new category to the database
        await category.save();
        // Respond with the created category object
        // res.send(category.toObject());
        return category.toObject();  

    } catch (error) {
        // Handle any errors that occur during save
        return { error: "Error saving category", details: error }; // Corrected the return format
    }
}


async function getCategories() {
    // Calls Category.find() to get all categories from the database
    //Category.find(), Mongoose returns an array of Mongoose document objects. These Mongoose documents have special 
    // methods like .save(), .remove(), .populate(), etc., which are specific to Mongoose and we dont want to show 
    // save(), .remove(), .populate(),  to client so we use map function to converts each Mongoose document to a 
    // plain JavaScript object.
        let categories = await Category.find();
        console.log("Categories" + categories);
        // Calls the map() method to loop over each category and convert it into an object    
        return categories.map(c => c.toObject());
      }
      

async function getCategoryById(id) {
    let category = await Category.findById(id);
    return category.toObject(); // Corrected method call
}    


// Function to update an existing category
async function updateCategory(id, model) {
    try {
        // Find the category by ID and update it with the new data
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id }, // Match condition (It will check which ID object it need to update)
            model,       // Data to update (It will update that object fields like name,description of object model with new data )
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            // If no category is found with the given ID
            return { error: "Category not found" }; // Removed `res.status` since it's not accessible here
        }

        // Respond with the updated category
        return updatedCategory;

    } catch (error) {
        // Handle any errors that occur during the update
        return { error: "Error updating category", details: error }; // Fixed misplaced parenthesis
    }
}


async function deleteCategory(id) {
    try { // find the object whose id = id and then delete that object 
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return { error: "Category not found" }; // If no category is found with the given ID
        }

        return { message: "Category deleted successfully" }; // Success message
    } catch (error) {
        return { error: "Error deleting category", details: error }; // Error handling
    }
}


  




// Export the functions
module.exports = {addCategory,updateCategory,deleteCategory,getCategories,getCategoryById};
