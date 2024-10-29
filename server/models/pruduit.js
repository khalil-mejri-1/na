const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  titre: String,
  prix: Number,
  img: String
});

const Produit = mongoose.model("product", produitSchema); // Corrected spelling and model name

module.exports = Produit;
