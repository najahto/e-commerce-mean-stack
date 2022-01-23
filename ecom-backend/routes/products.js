const express = require('express');
const router = express.Router();
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const mongoose = require('mongoose');

/**
 * create product
 */
router.post('/', async (req, res, next) => {
  // check if the category is valid
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    image: req.body.image,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();

  if (!product) return res.status(500).send('The product cannot be created');

  res.status(201).json({
    success: true,
    message: 'the product successfully created',
    category: product,
  });
});

/**
 * get all products
 */
router.get('/', async (req, res, next) => {
  let filter = {};
  // check if req query has categories to filter
  if (req.query.categories) {
    filter = {
      category: req.query.categories.split(','),
    };
  }

  const products = await Product.find(filter).populate('category');

  if (!products) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(products);
});

/**
 * find one product
 */
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) {
    res.status(404).json({
      success: false,
      message: 'the product with the given Id was not found.',
    });
  }
  res.status(200).send(product);
});

/**
 * update product
 */
router.put('/:id', async (req, res) => {
  // check if the product Id is valid
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product Id');

  // check if the category is valid
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      image: req.body.image,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send('the product cannot be updated!');

  res.status(200).json({
    success: true,
    message: 'the product successfully updated',
    product: product,
  });
});

/**
 * remove product
 */
router.delete('/:id', async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: 'the product deleted successfully',
        });
      } else {
        res.status(404).json({ success: false, message: 'product not found!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

/**
 * Products count
 */
router.get('/get/count', async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    res.statusCode(500).json({ success: false });
  }
  res.status(200).send({
    count: productCount,
  });
});

/**
 * Featured Products
 */
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    +count
  );
  if (!featuredProducts) {
    res.statusCode(500).json({ success: false });
  }
  res.status(200).send({
    featured: featuredProducts,
  });
});

module.exports = router;
