import express from "express";

const app = express();

const HOST = "localhost";
const PORT = 8000;

app.get("/timestamp", (req, res) => {
    res.status(418).json({time: new Date().toLocaleTimeString()});
});

app.listen(PORT, HOST, () => {
    console.log("Server is running at http://localhost:8000");
});
