// models/data.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    id: { type: String, required: true }, // معرف المنتج
    quantity: { type: Number, default: 1 } // كمية المنتج
});

const PanierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    items: [ItemSchema] // مصفوفة من العناصر التي تحتوي على معرف المنتج والكمية
});

const Panier = mongoose.model("Panier", PanierSchema);

module.exports = Panier;
