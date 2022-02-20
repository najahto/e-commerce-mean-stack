const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.registerUser);

router.post('/login', userController.userLogin);

router.get('/', userController.getUsers);

router.get('/:id', userController.findUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/get/count', userController.getUsersCount);

module.exports = router;
