const ytService = require('../services/ytService');
const formatService = require('../services/formatService');

// POST /api/analyze
async function analyze(req, res, next) {
  try {
    const { url } = req.body;
    // call ytService to extract metadata
    const meta = await ytService.getMetadata(url);

    if (!meta) return res.status(502).json({ ok: false, error: 'No metadata available' });

    const normalized = formatService.normalizeFormats(meta.formats || []);

    const payload = {
      title: meta.title || '',
      thumbnail: meta.thumbnail || null,
      duration: meta.duration || null,
      uploader: meta.uploader || meta.uploader_id || null,
      uploadDate: meta.upload_date || null,
      description: meta.description || null,
      formats: normalized,
      raw: meta,
    };

    return res.json({ ok: true, data: payload });
  } catch (err) {
    next(err);
  }
}

module.exports = { analyze };
