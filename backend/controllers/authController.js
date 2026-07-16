const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");

const getUserStore = () => {
    if (!global.inMemoryUsers) {
        global.inMemoryUsers = [];
    }
    return global.inMemoryUsers;
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password." });
        }

        if (mongoose.connection.readyState === 1) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fashion-secret", { expiresIn: "1d" });
            return res.status(201).json({
                message: "User registered successfully",
                token,
                user: { id: user._id, name: user.name, email: user.email },
            });
        }

        const store = getUserStore();
        const existingUser = store.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), name, email, password: hashedPassword };
        store.push(user);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "fashion-secret", { expiresIn: "1d" });
        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (mongoose.connection.readyState === 1) {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fashion-secret", { expiresIn: "1d" });
            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user._id, name: user.name, email: user.email },
            });
        }

        const store = getUserStore();
        const user = store.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "fashion-secret", { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
