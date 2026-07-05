const app = require('./app');
const config = require('./config');

const server = app.listen(config.PORT, () => {
  console.log(`YTGrab backend listening on port ${config.PORT} (env=${config.NODE_ENV})`);
});

// graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});
