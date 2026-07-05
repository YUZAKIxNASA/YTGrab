const getEnv = (key, fallback) => process.env[key] ?? fallback;

module.exports = {
  PORT: Number(getEnv('PORT', 8000)),
  NODE_ENV: getEnv('NODE_ENV', 'production'),
  YTDLP_PATH: getEnv('YTDLP_PATH', 'yt-dlp'),
  RATE_LIMIT_WINDOW_MS: Number(getEnv('RATE_LIMIT_WINDOW_MS', 60000)),
  RATE_LIMIT_MAX: Number(getEnv('RATE_LIMIT_MAX', 30)),
  MAX_DOWNLOAD_MB: Number(getEnv('MAX_DOWNLOAD_MB', 200)),
  CORS_ORIGINS: (getEnv('CORS_ORIGINS', 'http://localhost:3000')).split(','),
  TRUST_PROXY: getEnv('TRUST_PROXY', 'false') === 'true',
  LOG_LEVEL: getEnv('LOG_LEVEL', 'info'),
  TEMP_DIR: getEnv('TEMP_DIR', '/tmp/ytgrab'),
  ANALYZE_CACHE_TTL_MS: Number(getEnv('ANALYZE_CACHE_TTL_MS', 600000)),
  DOWNLOAD_TIMEOUT_MS: Number(getEnv('DOWNLOAD_TIMEOUT_MS', 900000)),
};
