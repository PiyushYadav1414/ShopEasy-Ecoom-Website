const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    name: String,
    selected: Boolean
    
})

const Brand = mongoose.model('brands',brandSchema);

module.exports = Brand;