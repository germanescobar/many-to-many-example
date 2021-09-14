const mongoose = require("mongoose")

var schema = mongoose.Schema({
  name: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});

// definimos el modelo
module.exports = mongoose.model("Category", schema);