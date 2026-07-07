const { spawn } = require('child_process');
const config = require('../config');
const logger = require('./logger');
const fs = require('fs');
const path = require('path');

// Ensure temp directory exists
function ensureTempDir() {
  if (!fs.existsSync(config.TEMP_DIR)) {
    fs.mkdirSync(config.TEMP_DIR, { recursive: true });
  }
}

/**
 * Execute yt-dlp command and return JSON output
 * @param {string} url - Video URL
 * @param {object} opts - Options (format, etc)
 * @returns {Promise<object>}
 */
function runYtDlp(url, opts = {}) {
  return new Promise((resolve, reject) => {
    ensureTempDir();

    const args = [
      '--dump-json',
      '--no-warnings',
      '--socket-timeout', '30',
      url,
    ];

    // Add format if specified
    if (opts.format) {
      args.unshift('-f', opts.format);
    }

    logger.debug(`Running: yt-dlp ${args.join(' ')}`);

    const proc = spawn(config.YTDLP_PATH, args, {
      timeout: config.DOWNLOAD_TIMEOUT_MS,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        logger.error(`yt-dlp failed with code ${code}`, stderr);
        let msg = 'Failed to analyze video';
        if (stderr.includes('Private')) msg = 'This video is private';
        if (stderr.includes('not available')) msg = 'This video is not available';
        if (stderr.includes('Playlist')) msg = 'Playlist requires special handling';
        const err = new Error(msg);
        err.status = 400;
        return reject(err);
      }

      try {
        const data = JSON.parse(stdout);
        resolve(data);
      } catch (e) {
        logger.error('Failed to parse yt-dlp JSON', e);
        const err = new Error('Failed to parse video data');
        err.status = 500;
        reject(err);
      }
    });

    proc.on('error', (err) => {
      logger.error('yt-dlp process error', err);
      const error = new Error('yt-dlp not found or not accessible');
      error.status = 500;
      reject(error);
    });
  });
}

/**
 * Stream video download using yt-dlp
 * @param {string} url - Video URL
 * @param {string} formatId - Format ID from yt-dlp
 * @returns {Promise<stream>}
 */
function streamYtDlp(url, formatId) {
  return new Promise((resolve, reject) => {
    const args = [
      '-f', formatId,
      '-o', '-', // Output to stdout
      '--no-warnings',
      '--socket-timeout', '30',
      url,
    ];

    logger.debug(`Streaming: yt-dlp ${args.join(' ')}`);

    const proc = spawn(config.YTDLP_PATH, args, {
      timeout: config.DOWNLOAD_TIMEOUT_MS,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    proc.on('error', (err) => {
      logger.error('yt-dlp stream error', err);
      const error = new Error('Failed to download video');
      error.status = 500;
      reject(error);
    });

    // Resolve immediately with stream, error handling on stream
    resolve(proc.stdout);
  });
}

/**
 * Check if yt-dlp is available
 * @returns {Promise<boolean>}
 */
function checkYtDlpAvailability() {
  return new Promise((resolve) => {
    const proc = spawn(config.YTDLP_PATH, ['--version'], {
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let found = false;

    proc.stdout.on('data', () => {
      found = true;
    });

    proc.on('close', () => {
      resolve(found);
    });

    proc.on('error', () => {
      resolve(false);
    });
  });
}

module.exports = {
  runYtDlp,
  streamYtDlp,
  checkYtDlpAvailability,
  ensureTempDir,
};
