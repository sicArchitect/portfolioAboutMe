const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/users.controller');

router.get('/auth/user', authMiddleware, userController.getLoggedUser);
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.delete('/auth/logout', authMiddleware, userController.logout);

module.exports = router;
