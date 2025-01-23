const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean //is used to differentiate between regular customers and admin users who can manage the products, orders, and users on the website.
  // WE HAVE TO MAKE ADMIN MANUALLY FROM DB AS THEY REMAIN SAME AND DOESNOT CHANGE 
});

const User = mongoose.model('users', userSchema);

module.exports = User;
