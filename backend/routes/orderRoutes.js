const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    deleteOrder
} = require("../controllers/orderController");

router.use(authMiddleware);

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrderById);

router.put("/:id/cancel", cancelOrder);
router.put("/:id", updateOrderStatus);

router.delete("/:id", deleteOrder);

module.exports = router;