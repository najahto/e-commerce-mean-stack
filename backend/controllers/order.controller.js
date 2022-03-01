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

  // calculate total price
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      );
      console.log('orderItem??', orderItem);
      return orderItem.product.price * orderItem.quantity;
    })
  );

  // get the sum of totalPrices array items
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  // save the order
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
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
  const orders = await Order.find()
    .populate('user', 'name')
    .sort('-dateOrdered');
  if (!orders) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(orders);
};

/**
 *  Find one order
 */
const findOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: { path: 'category' } },
    });

  if (!order) {
    res.status(404).json({
      success: false,
      message: 'the order with the given Id was not found.',
    });
  }
  res.status(200).send(order);
};

/**
 * Update order status
 */
const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) return res.status(400).send('the order cannot be update!');

  res.send(order);
};

/**
 * remove order
 */
const deleteOrder = async (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: 'Order deleted successfully!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Order not found!' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

/**
 * Total sales
 */
const getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    {
      $group: { _id: null, totalSales: { $sum: '$totalPrice' } },
    },
  ]);
  if (!totalSales) {
    res.statusCode(500).send('Orders sales cannot be calculated');
  }
  res.status(200).send({
    totalSales: totalSales.pop().totalSales,
  });
};

/**
 * Orders count
 */
const getOrdersCount = async (req, res) => {
  const orderCount = await Order.countDocuments();
  if (!orderCount) {
    res.statusCode(500).json({ success: false });
  }
  res.status(200).send({
    count: orderCount,
  });
};

/**
 * find orders by user
 */
const getUserOrders = async (req, res) => {
  const userOrders = await Order.find({ user: req.params.userId })
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: { path: 'category' } },
    })
    .sort('-dateOrdered');

  if (!userOrders) {
    res.status(500).json({ success: false });
  }
  res.send(userOrders);
};

module.exports = {
  createOrder,
  getOrders,
  findOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrdersCount,
  getUserOrders,
};
