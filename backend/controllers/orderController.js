const mongoose = require("mongoose");
const Order = require("../models/Order");

const getOrderStore = () => {
    if (!global.inMemoryOrders) {
        global.inMemoryOrders = [];
    }
    return global.inMemoryOrders;
};

const serializeOrder = (order) => ({
    ...order,
    _id: order._id || order.id,
    createdAt: order.createdAt || new Date().toISOString(),
    updatedAt: order.updatedAt || new Date().toISOString(),
});

// Create Order
const createOrder = async (req, res) => {
    try {
        const {
            name,
            mobile,
            address,
            user,
            products,
            totalAmount
        } = req.body;

        if (mongoose.connection.readyState === 1) {
            const order = new Order({
                name,
                mobile,
                address,
                user: user || req.user?.id,
                products,
                totalAmount,
                status: req.body.status || "Success"
            });

            await order.save();

            return res.status(201).json({
                message: "Order Placed Successfully",
                order
            });
        }

        const store = getOrderStore();
        const order = serializeOrder({
            id: Date.now().toString(),
            _id: Date.now().toString(),
            name,
            mobile,
            address,
            user: user || req.user?.id,
            products,
            totalAmount,
            status: req.body.status || "Success",
            cancellationReason: "",
            canceledAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        store.push(order);

        return res.status(201).json({
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
        if (mongoose.connection.readyState !== 1) {
            const store = getOrderStore();
            const orders = store
                .filter((order) => order.user?.toString() === req.user?.id)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return res.status(200).json(orders.map(serializeOrder));
        }

        const orders = await Order.find({ user: req.user?.id })
            .populate("user")
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);

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
        if (mongoose.connection.readyState !== 1) {
            const store = getOrderStore();
            const order = store.find((item) => item._id?.toString() === req.params.id);

            if (!order) {
                return res.status(404).json({
                    message: "Order Not Found"
                });
            }

            if (order.user?.toString() !== req.user?.id) {
                return res.status(403).json({
                    message: "Access Denied"
                });
            }

            return res.status(200).json(serializeOrder(order));
        }

        const order = await Order.findById(req.params.id)
            .populate("user");

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        if (order.user?._id?.toString() !== req.user?.id && order.user?.toString() !== req.user?.id) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        return res.status(200).json(order);

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
        if (mongoose.connection.readyState !== 1) {
            const store = getOrderStore();
            const order = store.find((item) => item._id?.toString() === req.params.id);

            if (!order) {
                return res.status(404).json({
                    message: "Order Not Found"
                });
            }

            order.status = req.body.status;
            order.updatedAt = new Date().toISOString();

            return res.status(200).json({
                message: "Order Updated Successfully",
                order: serializeOrder(order)
            });
        }

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

        return res.status(200).json({
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

const cancelOrder = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const store = getOrderStore();
            const order = store.find((item) => item._id?.toString() === req.params.id);

            if (!order) {
                return res.status(404).json({
                    message: "Order Not Found"
                });
            }

            if (order.user?.toString() !== req.user?.id) {
                return res.status(403).json({
                    message: "Access Denied"
                });
            }

            const currentStatus = (order.status || "").toLowerCase();

            if (currentStatus === "canceled" || currentStatus === "delivered") {
                return res.status(400).json({
                    message: "This order cannot be canceled."
                });
            }

            const reason = (req.body.reason || "").trim();

            order.status = "Canceled";
            order.cancellationReason = reason || "Ordered by mistake";
            order.canceledAt = new Date().toISOString();
            order.updatedAt = new Date().toISOString();

            return res.status(200).json({
                message: "Your order has been canceled.",
                order: serializeOrder(order)
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        if (order.user?.toString() !== req.user?.id && order.user?.toString() !== req.user?.id) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const currentStatus = (order.status || "").toLowerCase();

        if (currentStatus === "canceled" || currentStatus === "delivered") {
            return res.status(400).json({
                message: "This order cannot be canceled."
            });
        }

        const reason = (req.body.reason || "").trim();

        order.status = "Canceled";
        order.cancellationReason = reason || "Ordered by mistake";
        order.canceledAt = new Date();

        await order.save();

        return res.status(200).json({
            message: "Your order has been canceled.",
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
        if (mongoose.connection.readyState !== 1) {
            const store = getOrderStore();
            const index = store.findIndex((item) => item._id?.toString() === req.params.id);

            if (index === -1) {
                return res.status(404).json({
                    message: "Order Not Found"
                });
            }

            store.splice(index, 1);

            return res.status(200).json({
                message: "Order Deleted Successfully"
            });
        }

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
    cancelOrder,
    deleteOrder
};