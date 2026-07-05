const ytService = require('../services/ytService');
const config = require('../config');

// GET /api/download?url=&format_id=
async function download(req, res, next) {
  try {
    const url = req.query.url;
    const formatId = req.query.format_id || req.query.format || null;
    if (!url) return res.status(400).json({ ok: false, error: 'Missing url' });

    // stream via ytService
    res.setHeader('X-Content-Source', 'yt-dlp');

    const stream = await ytService.streamFormatToResponse({ url, formatId, res });
    // streamFormatToResponse handles piping and headers
  } catch (err) {
    next(err);
  }
}

module.exports = { download };
