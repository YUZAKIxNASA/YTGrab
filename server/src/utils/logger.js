const config = require('../config');

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = LOG_LEVELS[config.LOG_LEVEL] || LOG_LEVELS.info;

const logger = {
  error: (msg, err) => {
    if (currentLevel >= LOG_LEVELS.error) {
      console.error(`[ERROR] ${msg}`, err || '');
    }
  },
  warn: (msg) => {
    if (currentLevel >= LOG_LEVELS.warn) {
      console.warn(`[WARN] ${msg}`);
    }
  },
  info: (msg) => {
    if (currentLevel >= LOG_LEVELS.info) {
      console.info(`[INFO] ${msg}`);
    }
  },
  debug: (msg) => {
    if (currentLevel >= LOG_LEVELS.debug) {
      console.debug(`[DEBUG] ${msg}`);
    }
  },
};

module.exports = logger;
