import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Placeholder from './Placeholder';
import ResultCard from './ResultCard';
import { analyzeUrl } from '../client/api';

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // small UX: preserve last URL in sessionStorage
    try {
      const last = sessionStorage.getItem('ytgrab:last_url');
      if (last) setUrl(last);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem('ytgrab:last_url', url); } catch (e) {}
  }, [url]);

  const onPaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (t) setUrl(t);
    } catch (e) {
      // ignore
    }
  };

  const onClear = () => { setUrl(''); setError(null); setResult(null); };

  const onAnalyze = async () => {
    setError(null);
    if (!url || !/^https?:\/\//i.test(url)) {
      setError('Please enter a valid URL (must include http/https)');
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeUrl(url);
      const normalized = {
        title: data.title || data.raw?.title || '',
        thumbnail: data.thumbnail || data.raw?.thumbnail || null,
        duration: data.duration || (data.raw && data.raw.duration) || null,
        channel: data.uploader || data.raw?.uploader || null,
        uploadDate: data.uploadDate || data.raw?.upload_date || null,
        views: data.raw?.view_count || data.raw?.viewCount || null,
        description: data.raw?.description || data.description || '',
        formats: data.formats || data.raw?.formats || [],
        link: url,
        raw: data.raw || data,
      };
      setResult(normalized);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Analyze failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Animated background */}
      <div className="hero-aurora pointer-events-none" aria-hidden />
      <div className="hero-orbs pointer-events-none" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              Download YouTube videos instantly — fast, private, and reliable.
            </motion.h1>

            <motion.p initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="mt-6 text-lg text-white/75 max-w-2xl">
              Paste a public YouTube link, analyze available qualities and formats, then download MP4 or MP3 directly from your browser. No accounts, no tracking — production-ready performance.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8">
              <div className="relative max-w-3xl">
                <input
                  id="hero-url"
                  className="h-16 w-full rounded-2xl bg-card/60 backdrop-blur-md border border-white/6 px-5 pr-40 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Paste YouTube video, short, or playlist URL"
                  value={url}
                  onChange={(e)=> setUrl(e.target.value)}
                  onKeyDown={(e)=> { if (e.key === 'Enter') onAnalyze(); }}
                  aria-label="Video URL"
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button onClick={onPaste} className="px-4 py-2 rounded-lg bg-white/6 text-sm hover:bg-white/8">Paste</button>
                  <button onClick={onClear} className="px-4 py-2 rounded-lg bg-white/6 text-sm hover:bg-white/8">Clear</button>
                  <button onClick={onAnalyze} disabled={loading} className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-glow hover:scale-[1.02] transition">
                    {loading ? 'Analyzing…' : 'Analyze'}
                  </button>
                </div>
              </div>

              {error && <div role="alert" className="mt-3 text-sm text-red-400">{error}</div>}

              <p className="mt-4 text-sm text-white/60">Supported: MP4 · MP3 · Shorts · Playlists · Thumbnail</p>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              <div className="pill">Fast</div>
              <div className="pill">No login</div>
              <div className="pill">Secure</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass rounded-2xl p-6">
              {/* Placeholder before analyze */}
              {!result && <Placeholder />}

              {/* Result card after analyze */}
              {result && <ResultCard data={result} />}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
