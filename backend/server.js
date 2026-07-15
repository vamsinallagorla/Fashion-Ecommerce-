require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);

const PORT = 5000;
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to Fashion E-commerce ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});