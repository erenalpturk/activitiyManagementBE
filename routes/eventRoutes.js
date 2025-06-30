const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Tüm etkinlikleri listele (herkes erişebilir)
router.get('/', eventController.getAllEvents);

// Yeni etkinlik oluştur (teacher/admin için)
router.post('/', eventController.createEvent);

// Etkinlik güncelle (teacher/admin için)
router.put('/:id', eventController.updateEvent);

// Etkinlik sil (admin için)
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
