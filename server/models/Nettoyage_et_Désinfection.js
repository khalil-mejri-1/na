// models/data.js
const mongoose = require("mongoose");

const Nettoyage_Desinfection_de_batimentsSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Nettoyage_Desinfection_de_batiments = mongoose.model("Nettoyage_Desinfection_de_bâtiments", Nettoyage_Desinfection_de_batimentsSchema);

module.exports = Nettoyage_Desinfection_de_batiments;
