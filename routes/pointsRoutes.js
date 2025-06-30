const express = require('express');
const router = express.Router();
const pointsController = require('../controllers/pointsController');

// Öğrenci puan geçmişini listele
router.get('/history', pointsController.getStudentPointsHistory);

// Puan geçmişi kaydı oluştur
router.post('/history', pointsController.createPointsHistory);

// Öğrenci toplam puanını getir
router.get('/student/:student_id/total', pointsController.getStudentTotalPoints);

module.exports = router; 