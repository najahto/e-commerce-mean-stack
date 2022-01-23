const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/', categoryController.createCategory);

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.findCategory);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.updateCategory);

module.exports = router;
