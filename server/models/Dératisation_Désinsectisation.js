// models/data.js
const mongoose = require("mongoose");

const DératisationDésinsectisationSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const DératisationDésinsectisation = mongoose.model("DératisationDésinsectisation", DératisationDésinsectisationSchema);

module.exports = DératisationDésinsectisation;
