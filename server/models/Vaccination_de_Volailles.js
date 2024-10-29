// models/data.js
const mongoose = require("mongoose");

const Vaccination_de_VolaillesSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Vaccination_de_Volailles = mongoose.model("Vaccination_de_Volailles", Vaccination_de_VolaillesSchema);

module.exports = Vaccination_de_Volailles;
