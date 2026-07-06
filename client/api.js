// client/api.js
// Lightweight API wrapper for frontend to call backend endpoints (/api/analyze, /api/download)

export async function analyzeUrl(url, { signal } = {}) {
  if (!url) throw new Error('Missing URL');
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    signal,
  });

  if (!res.ok) {
    let text;
    try { text = await res.text(); } catch (e) { text = res.statusText; }
    const msg = `Analyze failed: ${res.status} ${text}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  const j = await res.json();
  if (!j || !j.ok) {
    const err = new Error((j && j.error) || 'Analyze error');
    err.status = j && j.status;
    throw err;
  }

  // Expecting backend to return the normalized payload in j.data
  return j.data;
}

export function buildDownloadUrl(url, formatId) {
  const base = '/api/download';
  const params = new URLSearchParams();
  params.set('url', url);
  if (formatId) params.set('format_id', formatId);
  return `${base}?${params.toString()}`;
}

// Streaming download helper (used later)
export async function streamDownloadToBlob(url, formatId, onProgress, { signal } = {}) {
  const dlUrl = buildDownloadUrl(url, formatId);
  const res = await fetch(dlUrl, { signal });
  if (!res.ok) throw new Error('Download failed');
  const contentLength = res.headers.get('Content-Length');
  if (!res.body) {
    // no streaming support; caller should fallback
    return { fallback: true, url: dlUrl };
  }
  const total = contentLength ? parseInt(contentLength, 10) : null;
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  const startTs = Date.now();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (onProgress && total) {
      const elapsed = (Date.now() - startTs) / 1000;
      const speed = received / elapsed; // bytes/sec
      const percent = (received / total) * 100;
      const eta = speed ? Math.max(0, Math.round((total - received) / speed)) : null;
      onProgress({ received, total, percent, speed, eta });
    } else if (onProgress) {
      onProgress({ received, total: null });
    }
  }
  const blob = new Blob(chunks);
  return { blob, total };
}
