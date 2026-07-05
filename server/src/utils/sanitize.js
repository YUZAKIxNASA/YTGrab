module.exports = function sanitizeString(input) {
  if (!input) return '';
  return String(input).replace(/[\u0000-\u001F\u007F<>]/g, '').trim();
};
