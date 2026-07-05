const express = require('express');
const router = express.Router();
const { download } = require('../controllers/downloadController');
const { validateUrl } = require('../middleware/validateUrl');

// GET /api/download?url=...&format_id=...
router.get('/', validateUrl, download);

module.exports = router;
