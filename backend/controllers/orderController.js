const Order = require("../models/Order");


// Create Order
const createOrder = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const {
            name,
            mobile,
            address,
            user,
            products,
            totalAmount
        } = req.body;

        const order = new Order({
            name,
            mobile,
            address,
            user,
            products,
            totalAmount
        });

        await order.save();

        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Orders
const getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user")
            

        res.status(200).json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Order By ID
const getOrderById = async (req, res) => {
    try {

        const orders = await Order.find().populate("user");
        const order = await Order.findById(req.params.id)
            .populate("user");
        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.status(200).json({
            message: "Order Updated Successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {

        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.status(200).json({
            message: "Order Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};