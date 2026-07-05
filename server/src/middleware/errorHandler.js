function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ ok: false, error: err.message || 'Internal Server Error' });
}

module.exports = { errorHandler };
