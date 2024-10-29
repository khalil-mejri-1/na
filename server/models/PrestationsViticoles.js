// models/data.js
const mongoose = require("mongoose");

const PrestationsViticolesSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const PrestationsViticoles = mongoose.model("PrestationsViticoles", PrestationsViticolesSchema);

module.exports = PrestationsViticoles;
