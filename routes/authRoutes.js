const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kullanıcı girişi
router.post('/login', authController.login);

// Kullanıcı çıkışı
router.post('/logout', authController.logout);

module.exports = router;
