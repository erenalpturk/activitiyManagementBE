const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Tüm kullanıcıları listele (admin için)
router.get('/', userController.getAllUsers);

// Yeni kullanıcı oluştur (admin/teacher için)
router.post('/', userController.createUser);

// Kullanıcı bilgilerini güncelle (admin/teacher için)
router.put('/:id', userController.updateUser);

// Kullanıcıyı sil (admin için)
router.delete('/:id', userController.deleteUser);

module.exports = router;
