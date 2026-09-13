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

app.listen(PORT, HOST, () => {
    console.log("Server is running at http://localhost:8000");
});
