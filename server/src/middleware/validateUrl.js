const { URL } = require('url');

function validateUrlString(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const u = new URL(value);
    if (!['http:', 'https:'].includes(u.protocol)) return false;
    // Basic host blacklist/whitelist handled elsewhere if needed
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { validateUrlString };
