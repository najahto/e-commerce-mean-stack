const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.registerUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.findUser);

router.put('/:id', userController.updateUser);

router.post('/login', userController.userLogin);

module.exports = router;
