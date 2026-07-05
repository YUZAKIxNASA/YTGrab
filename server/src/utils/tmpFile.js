const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

function tmpFilePath(prefix = 'ytgrab') {
  const name = `${prefix}-${crypto.randomBytes(6).toString('hex')}`;
  return path.join(os.tmpdir(), name);
}

module.exports = { tmpFilePath };
