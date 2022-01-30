const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * User login
 */
const userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('User not found!');
  }
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.name,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
    );
    return res
      .status(200)
      .send({ user: { name: user.name, email: user.email }, token: token });
  } else {
    return res.status(400).send('Invalid credentials!');
  }
};

/**
 * Register user
 */
const registerUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 16),
    phone: req.body.phone,
    city: req.body.city,
    zip: req.body.zip,
    street: req.body.street,
    apartment: req.body.apartment,
    country: req.body.country,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();
  if (!user) return res.status(400).send('the user cannot be created!');

  res.status(201).json({
    success: true,
    message: 'the user successfully created',
    user: user,
  });
};

/**
 * Find all users
 */
const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  if (!users) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(users);
};

/**
 *  Find one user
 */
const findUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'the user with the given Id was not found.',
    });
  }
  res.status(200).send(user);
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  //check if the user entered a new password
  const userExists = await User.findById(req.params.id);
  let password;
  if (req.body.password) {
    password = bcrypt.hashSync(req.body.password, 16);
  } else {
    password = userExists.password;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: password,
      phone: req.body.phone,
      city: req.body.city,
      zip: req.body.zip,
      street: req.body.street,
      apartment: req.body.apartment,
      country: req.body.country,
      isAdmin: req.body.isAdmin,
    },
    {
      new: true,
    }
  );

  if (!user) return res.status(400).send('the user cannot be updated!');

  res.status(200).json({
    success: true,
    message: 'the user successfully updated',
    user: user,
  });
};

/**
 * Users count
 */
const getUsersCount = async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    res.statusCode(500).json({ success: false });
  }
  res.status(200).send({
    count: userCount,
  });
};

module.exports = {
  registerUser,
  getUsers,
  findUser,
  updateUser,
  userLogin,
  getUsersCount,
};
