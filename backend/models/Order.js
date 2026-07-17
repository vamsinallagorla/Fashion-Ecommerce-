const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },

    products: [
        {
            id: Number,

            name: String,

            price: Number,

            category: String,

            image: String,

            quantity: Number,
        },
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Success"
    },

    cancellationReason: {
        type: String,
        default: ""
    },

    canceledAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);