module.exports = function healthController() {
  return async function health(req, res) {
    // quick yt-dlp availability check
    const { spawnSync } = require('child_process');
    const config = require('../config');
    let ytAvailable = false;
    try {
      const r = spawnSync(config.YTDLP_PATH, ['--version'], { timeout: 2000 });
      ytAvailable = r.status === 0;
    } catch (e) {
      ytAvailable = false;
    }

    res.json({ ok: true, uptime: process.uptime(), ytDlpAvailable: ytAvailable });
  };
}();
