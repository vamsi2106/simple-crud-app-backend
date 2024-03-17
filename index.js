const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/products.model.js");

const app = express();

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://saivamsi1121:ZMRihClY42afyKDE@backenddb.fwhq33v.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(() => console.log("Connection Failed"));

app.get("/", (req, res) => {
  res.send("Hello Node");
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//Create a Product API
app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//Update a Product API
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product Not Exist" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a Product API
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Product not found or exist" });
    }
    res.status(200).json({ message: "product deleted successfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
