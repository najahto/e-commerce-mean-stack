const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder);

router.get('/', orderController.getOrders);

router.get('/:id', orderController.findOrder);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

router.get('/get/totalSales', orderController.getTotalSales);

router.get('/get/count', orderController.getOrdersCount);

module.exports = router;
