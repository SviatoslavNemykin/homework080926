import express from "express";

const app = express();

const HOST = "localhost";
const PORT = 8000;

app.get("/timestamp", (req, res) => {
    res.status(418).json({time: new Date().toLocaleTimeString()});
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/stats', (req, res) => {
  res.json({
    uptime: Math.floor(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});


//14.09.2026
const products = [
  {id:1, name: "Potats", price: 3.49, category: "vegetables"},
  {id:2, name: "Laptop", price: 3499.99, category: "electronics"},
  {id:3, name: "Headphones", price: 309.99, category: "electronics"},
  {id:4, name: "Apple", price: 5, category: "fruits"},
  {id:5, name: "Banan", price: 6.79, category: "fruits"},
]

app.get('/products', (req, res) => {
  const category = req.query.category;
  const take = req.query.take;

  let result = products;

  if (category) {
    result = result.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  if (take !== undefined) {
    const takeNumber = Number(take);

    if (isNaN(takeNumber) || takeNumber <= 0) {
      return res.status(400).json({
        message: 'take must be a positive number'
      });
    }
    result = result.slice(0, takeNumber);
  }

  res.status(200).json(result);
});


app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      message: 'id must be a positive number'
    });
  }

  const product = products.find(product => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'product not found'
    });
  }

  res.status(200).json(product);
});

app.listen(PORT, HOST, () => {
    console.log("Server is running at http://localhost:8000");
});
