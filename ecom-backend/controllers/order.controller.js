const { json } = require('express/lib/response');
const { Order } = require('../models/order.model');
const { OrderItem } = require('../models/order-item.model');
const { User } = require('../models/user.model');

/**
 * Create order
 */
const createOrder = async (req, res) => {
  // get order items Ids
  console.log('orderItems', req.body.orderItems);
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      console.log('newOrderItem', newOrderItem);
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;
  console.log('orderItemsIdsResolved', orderItemsIdsResolved);
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  order = await order.save();
  if (!order) return res.status(400).send('the order cannot be created!');

  res.status(201).json({
    success: true,
    message: 'the category successfully created',
    order: order,
  });
};

/**
 * Find all orders
 */
const getOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name');
  if (!orders) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(orders);
};

module.exports = {
  createOrder,
  getOrders,
};
