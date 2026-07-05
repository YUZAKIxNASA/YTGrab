const express = require('express');
const router = express.Router();
const { analyze } = require('../controllers/analyzeController');
const { validateUrl } = require('../middleware/validateUrl');

router.post('/', validateUrl, analyze);

module.exports = router;
