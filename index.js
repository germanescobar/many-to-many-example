const express = require("express")
const mongoose = require("mongoose");
const Product = require("./Product");
const Category = require("./Category");
const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

app.get('/', async (req, res) => {
  const products = await Product.find().populate("categories")
  res.json(products);
});

app.post('/products', async (req, res) => {
  console.log("Entró a products")
  const c1 = new Category({ name: "Electrodomésticos" })
  await c1.save()
  const c2 = await Category.create({ name: "Hogar" })

  const p1 = await Product.create({ name: "Lavadora LG", description: "...", price: 1200, categories: [c1, c2] })
  c1.products.push(p1)
  await c1.save()

  c2.products.push(p1)
  await c2.save()

  res.json({})
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message })
})

app.listen(3000, () => console.log('Listening on port 3000!'));