// models/data.js
const mongoose = require("mongoose");

const VendangesSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Vendanges = mongoose.model("Vendanges", VendangesSchema);

module.exports = Vendanges;
