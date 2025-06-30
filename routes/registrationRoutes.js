const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// Etkinlik kaydını yap (student için)
router.post('/:id/register', registrationController.registerForEvent);

// Etkinlik kaydını sil (teacher/admin için)
router.delete('/:id', registrationController.removeRegistration);

// Etkinlik yoklamasını güncelle (teacher için)
router.put('/:id/attendance', registrationController.updateAttendance);

module.exports = router;
