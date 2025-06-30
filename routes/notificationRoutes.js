const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Bildirim gönder (admin/teacher için)
router.post('/', notificationController.sendNotification);

// Kullanıcının bildirimlerini listele (user için)
router.get('/', notificationController.getUserNotifications);

module.exports = router;
