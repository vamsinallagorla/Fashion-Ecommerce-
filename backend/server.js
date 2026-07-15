require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

const PORT = 5000;
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to Fashion E-commerce ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});