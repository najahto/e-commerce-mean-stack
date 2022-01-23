const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.createProduct);

router.get('/', productController.getProducts);

router.get('/:id', productController.findProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/get/count', productController.getProductsCount);

router.get('/get/featured/:count', productController.getFeaturedProducts);

module.exports = router;
