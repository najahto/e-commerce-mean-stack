const { json } = require('express/lib/response');
const { Category } = require('../models/category.model');

/**
 * Create category
 */
const createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) return res.status(400).send('the category cannot be created!');

  res.status(201).json({
    success: true,
    message: 'the category successfully created',
    category: category,
  });
};

/**
 * Find all categories
 */
const getCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(categories);
};

/**
 *  Find one category
 */
const findCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({
      success: false,
      message: 'the category with the given Id was not found.',
    });
  }
  res.status(200).send(category);
};

/**
 * Update category
 */
const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) return res.status(400).send('the category cannot be updated!');

  res.status(200).json({
    success: true,
    message: 'the category successfully updated',
    category: category,
  });
};

/**
 * remove category
 */
const deleteCategory = async (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: 'the category deleted successfully',
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: 'category not found!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  createCategory,
  getCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
