const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploadOptions = require('../middleware/upload');

router.post(
  '/',
  uploadOptions.single('image'),
  productController.createProduct
);

router.get('/', productController.getProducts);

router.get('/:id', productController.findProduct);

router.put(
  '/:id',
  uploadOptions.single('image'),
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

router.get('/get/count', productController.getProductsCount);

router.get('/get/featured/:count', productController.getFeaturedProducts);

router.put(
  '/gallery-images/:id',
  uploadOptions.array('images', 10),
  productController.uploadGalleryImages
);

module.exports = router;
