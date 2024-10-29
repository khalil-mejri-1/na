// models/data.js
const mongoose = require("mongoose");

const Ramassage_de_volaillesSchema = new mongoose.Schema({
    selectCategory: String,
    email: String,
    img: String
});

const Ramassage_de_volailles = mongoose.model("ramassage_de_volailles", Ramassage_de_volaillesSchema);

module.exports = Ramassage_de_volailles;
