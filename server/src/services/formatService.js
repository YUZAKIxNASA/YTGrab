function normalizeFormats(formats) {
  // formats is an array from yt-dlp
  if (!Array.isArray(formats)) return [];

  return formats
    .map((f) => {
      const size = f.filesize || f.filesize_approx || null;
      const quality = f.format_note || f.format || (f.height ? `${f.height}p` : 'unknown');

      return {
        id: f.format_id || f.format,
        ext: f.ext || null,
        quality,
        mime: f.protocol || f.acodec || null,
        sizeBytes: size,
        note: f.format || null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // prefer higher quality if possible (simple heuristic)
      const qa = parseInt((a.quality || '').replace(/[^0-9]/g, '') || '0', 10);
      const qb = parseInt((b.quality || '').replace(/[^0-9]/g, '') || '0', 10);
      return qb - qa;
    });
}

module.exports = { normalizeFormats };
