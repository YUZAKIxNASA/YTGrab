import { useState } from "react";
import { analyzeUrl } from "../client/api";
import ResultCard from "./ResultCard";

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onPaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (t) setUrl(t);
    } catch (e) {
      // ignore clipboard errors
    }
  };

  const onClear = () => { setUrl(''); setResult(null); setError(null); };

  const onAnalyze = async () => {
    if (!url) { setError('Please enter a URL'); return; }
    setLoading(true); setError(null);
    try {
      const data = await analyzeUrl(url);
      // Adapt backend payload to ResultCard expected shape if necessary
      // Expected fields: title, thumbnail, duration, uploader, uploadDate, formats
      const normalized = {
        title: data.title || data.raw?.title || '',
        thumbnail: data.thumbnail || data.raw?.thumbnail || null,
        duration: data.duration || (data.raw && data.raw.duration) || null,
        channel: data.uploader || data.raw?.uploader || null,
        uploadDate: data.uploadDate || data.raw?.upload_date || null,
        views: data.raw?.view_count || data.raw?.viewCount || null,
        formats: data.formats || data.raw?.formats || [],
        link: url,
        raw: data.raw || data.raw,
      };
      setResult(normalized);
    } catch (err) {
      console.error('analyze error', err);
      setError(err.message || String(err));
      setResult(null);
    } finally { setLoading(false); }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onAnalyze();
  };

  return (
    <section id="home" className="relative py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold">Download YouTube Videos Instantly</h1>
        <p className="mt-3 text-lg text-white/80">Paste a YouTube link, analyze formats and download MP4 or MP3 — fast and private.</p>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="w-full sm:w-2/3">
              <div className="relative">
                <input id="url" value={url} onChange={(e)=>setUrl(e.target.value)} onKeyDown={onKeyDown} className="w-full rounded-xl py-4 px-4 pr-32 bg-card border border-white/6 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Paste a YouTube video, short, or playlist URL" aria-invalid={!!error} />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button onClick={onPaste} className="px-3 py-2 bg-white/6 rounded-md hover:scale-105 transition">Paste</button>
                  <button onClick={onClear} className="px-3 py-2 bg-white/6 rounded-md">Clear</button>
                  <button onClick={onAnalyze} disabled={loading} className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-md shadow-glow hover:brightness-105 transition" aria-live="polite">{loading ? 'Analyzing…' : 'Analyze'}</button>
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-red-400" role="alert">{error}</p>}
              <p className="mt-2 text-sm text-white/60">Supported: MP4 · MP3 · Shorts · Playlists · Thumbnails</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {result && <ResultCard data={result} />}
        </div>
      </div>
    </section>
  );
}
