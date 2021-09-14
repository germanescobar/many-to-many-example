const mongoose = require("mongoose")

var schema = mongoose.Schema({
  name: String,
  description: String,
  price: { type: Number, default: 0 },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }]
});

// definimos el modelo
module.exports = mongoose.model("Product", schema);