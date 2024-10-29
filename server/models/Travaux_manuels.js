// models/data.js
const mongoose = require("mongoose");

const Travaux_manuelsSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Travaux_manuels = mongoose.model("Travaux_manuels", Travaux_manuelsSchema);

module.exports = Travaux_manuels;
