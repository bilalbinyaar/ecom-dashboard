// routes/contactRoutes.js

const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/submit', contactController.createContactInfo);
router.get('/get-contacts', contactController.getContacts);

module.exports = router;
