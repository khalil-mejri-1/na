// models/data.js
const mongoose = require("mongoose");

const Taille_des_vignesSchema = new mongoose.Schema({

    selectCategory:String,
    email:String,
    img:String


 
});

const Taille_des_vignes = mongoose.model("Taille_des_vignes", Taille_des_vignesSchema);

module.exports = Taille_des_vignes;
