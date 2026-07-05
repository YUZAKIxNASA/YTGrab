const { spawn } = require('child_process');
const concat = require('concat-stream');
const config = require('../config');
const { once } = require('events');

// Simple in-memory cache for analyze results
const LRU = require('lru-cache');
const cache = new LRU({ max: 500, ttl: config.ANALYZE_CACHE_TTL_MS });

async function getMetadata(url) {
  if (cache.has(url)) return cache.get(url);

  return new Promise((resolve, reject) => {
    const args = ['--no-playlist', '--skip-download', '--print-json', url];
    const child = spawn(config.YTDLP_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let out = '';
    let err = '';

    child.stdout.on('data', (c) => (out += c.toString()));
    child.stderr.on('data', (c) => (err += c.toString()));

    child.on('error', (e) => reject(e));

    child.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`yt-dlp exited ${code}: ${err.slice(0, 200)}`));
      }
      try {
        const parsed = JSON.parse(out);
        cache.set(url, parsed);
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    });

    // safety timeout
    setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('yt-dlp timeout'));
    }, 30_000);
  });
}

async function streamFormatToResponse({ url, formatId, res }) {
  return new Promise((resolve, reject) => {
    const args = ['-f', formatId || 'best', '--no-playlist', '-o', '-', url];
    const child = spawn(config.YTDLP_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    // pipe headers not known until content starts; we'll stream bytes
    let headSent = false;

    child.stdout.on('data', (chunk) => {
      if (!headSent) {
        // set minimal headers
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="download"');
        headSent = true;
      }
      const ok = res.write(chunk);
      if (!ok) child.stdout.pause();
    });

    res.on('drain', () => child.stdout.resume());

    child.stderr.on('data', (c) => console.error('[yt-dlp]', c.toString().slice(0, 500)));

    child.on('error', (e) => reject(e));

    child.on('close', (code) => {
      try { res.end(); } catch (e) {}
      if (code === 0) return resolve();
      return reject(new Error(`yt-dlp exited ${code}`));
    });

    // download timeout
    const killTimer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('download timeout'));
    }, config.DOWNLOAD_TIMEOUT_MS);

    // clean up timers on finish
    child.on('exit', () => clearTimeout(killTimer));
  });
}

module.exports = { getMetadata, streamFormatToResponse };
