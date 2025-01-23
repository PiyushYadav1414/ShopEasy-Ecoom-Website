const express = require("express");
const router = express.Router();
const { getOrders, updateOrderStatus } = require("../handlers/order-handler");

// Below is for admin to see all order and update order status
router.get("/", async (req, res) => {
    try { 
        const orders = await getOrders();
        res.send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ message: "Error fetching orders" });
    }
});

router.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await updateOrderStatus(id, status);
        res.send({ message: "Order status updated" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).send({ message: "Error updating order status" });
    }
});

module.exports = router;
