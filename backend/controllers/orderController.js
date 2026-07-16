const nodemailer = require("nodemailer");

const getOrderStore = () => {
    if (!global.inMemoryOrders) {
        global.inMemoryOrders = [];
    }
    return global.inMemoryOrders;
};

const sendOrderEmail = async (order) => {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return { sent: false, reason: "SMTP not configured" };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: order.user?.identifier || order.user?.email || "customer@example.com",
        subject: "Fashion Boutique Order Confirmation",
        text: `Hi ${order.user?.name || "there"},\n\nYour order has been placed successfully.\n\nCustomer: ${order.customer.name}\nMobile: ${order.customer.mobile}\nAddress: ${order.customer.address}\n\nItems: ${order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}\nTotal: ₹${order.totalPrice}\nPayment: ${order.paymentMethod}`,
    });

    return { sent: true };
};

const createOrder = async (req, res) => {
    try {
        const { user, customer, items, totalPrice, paymentMethod } = req.body;

        const order = {
            id: Date.now().toString(),
            user,
            customer,
            items,
            totalPrice,
            paymentMethod,
            placedAt: new Date().toISOString(),
        };

        const store = getOrderStore();
        store.push(order);

        const emailResult = await sendOrderEmail(order);

        res.status(201).json({
            message: "Order placed successfully",
            order,
            emailSent: emailResult.sent,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        res.status(200).json(getOrderStore());
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = getOrderStore().find((item) => item.id === req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const store = getOrderStore();
        const order = store.find((item) => item.id === req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = req.body.status;
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const store = getOrderStore();
        const index = store.findIndex((item) => item.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "Order not found" });
        }
        store.splice(index, 1);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};