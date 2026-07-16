const mongoose = require("mongoose");

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn("MONGO_URI not set. Running in demo mode with in-memory storage.");
        return false;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
        return true;
    } catch (error) {
        console.warn("Database Connection Failed. Falling back to in-memory storage:", error.message);
        return false;
    }
};

module.exports = connectDB;