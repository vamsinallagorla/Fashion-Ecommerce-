const Order = require("../models/Order");

//Create Order
const createOrder = async (req, res) => {
    try {

        const {
            user,
            products,
            totalAmount
        } = req.body;

        const order = new Order({
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

        res.status(500).json({
            message: "Server Error"
        });

    }
};

//Get All Orders
const getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user")
            .populate("products.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

//Get OrderById
const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

//Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

//Delete Order
const deleteOrder = async (req, res) => {
    try {

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Order Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};
module.exports={
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
}