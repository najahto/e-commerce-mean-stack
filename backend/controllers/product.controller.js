const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const mongoose = require('mongoose');

/**
 * Create product
 */
const createProduct = async (req, res, next) => {
  // check if the category is valid
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  // check if the request has file
  const file = req.file;
  if (!file) return res.status(400).send('No image in the request');

  const fileName = file.filename;
  const destination = `/public/uploads/`;

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    image: `${destination}${fileName}`,
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
    product: product,
  });
};

/**
 * get all products
 */
const getProducts = async (req, res, next) => {
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
};

/**
 *  Find one product
 */
const findProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) {
    res.status(404).json({
      success: false,
      message: 'the product with the given Id was not found.',
    });
  }
  res.status(200).send(product);
};

/**
 * Update product
 */
const updateProduct = async (req, res) => {
  // check if the product Id is valid
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product Id');

  // check if the category is valid
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send('Invalid Product!');

  const file = req.file;
  let imagePath;

  if (file) {
    const fileName = file.filename;
    const destination = `/public/uploads/`;
    imagePath = `${destination}${fileName}`;
  } else {
    imagePath = product.image;
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      image: imagePath,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!updateProduct)
    return res.status(500).send('the product cannot be updated!');

  res.status(200).json({
    success: true,
    message: 'the product successfully updated',
    product: updateProduct,
  });
};

/**
 * remove product
 */
const deleteProduct = async (req, res) => {
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
};

/**
 * Products count
 */
const getProductsCount = async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    res.statusCode(500).json({ success: false });
  }
  res.status(200).send({
    count: productCount,
  });
};

/**
 * Featured Products
 */
const getFeaturedProducts = async (req, res) => {
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
};

/**
 * product gallery multiple images upload
 */
const uploadGalleryImages = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id');
  }
  const files = req.files;
  let imagesPaths = [];
  const destination = `/public/uploads/`;

  if (files) {
    files.map((file) => {
      imagesPaths.push(`${destination}${file.filename}`);
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagesPaths,
    },
    { new: true }
  );

  if (!product) return res.status(500).send('the gallery cannot be updated!');

  res.send(product);
};

module.exports = {
  createProduct,
  getProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  getProductsCount,
  getFeaturedProducts,
  uploadGalleryImages,
};
