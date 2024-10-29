// models/data.js
const mongoose = require("mongoose");

const Travaux_mécaniquesSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Travaux_mécaniques = mongoose.model("Travaux_mécaniques", Travaux_mécaniquesSchema);

module.exports = Travaux_mécaniques;
