// models/data.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const User = mongoose.model("users", userSchema);

module.exports = User;
