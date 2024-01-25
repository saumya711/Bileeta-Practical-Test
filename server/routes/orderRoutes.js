const express = require('express');
const router = express.Router();
const { CreateNewOrder, getOrders, deleteOrder, getOrderById, updateOrder } = require('../controllers/orderController');

router.post('/order', CreateNewOrder);
router.get('/orders', getOrders);
router.delete('/order/:OrderID', deleteOrder);
router.get('/order/:OrderID', getOrderById);
router.put('/order/:OrderID', updateOrder);

module.exports = router;
