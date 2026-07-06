import { useState } from "react";
import { motion } from "framer-motion";
import ResultCard from "./ResultCard";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyze = async () => {
    setError("");
    if (!url.trim()) {
      setError("Please paste a valid URL.");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const j = await res.json();
      if (!j.ok) {
        setError(j.error || 'Analyze failed');
        setStatus('error');
        return;
      }
      const data = j.data;
      setResult({
        thumbnail: data.thumbnail || 'https://placehold.co/560x315/png?text=Thumbnail',
        title: data.title,
        channel: data.uploader,
        duration: data.duration ? String(data.duration) : null,
        uploadDate: data.uploadDate,
        formats: data.formats || [],
        link: url
      });
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setError('Failed to analyze the link. Try again later.');
    }
  };

  const paste = async () => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        setUrl(text);
      } catch {
        setError('Clipboard access denied. Paste manually.');
      }
    }
  };

  return (
    <section id="home" className="relative py-20">
      <div aria-hidden className="absolute -left-20 -top-10 w-72 h-72 rounded-full bg-gradient-to-tr from-primary to-accent floating opacity-30"></div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ y: 20, opacity: 0, scale: 0.99 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          Grab videos in seconds — fast, private, and clean.
        </motion.h1>

        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          Paste a public video link, analyze, and download in multiple formats. No accounts. No tracking. Just fast results.
        </p>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="w-full sm:w-2/3">
              <label htmlFor="url" className="sr-only">Video URL</label>
              <div className="relative">
                <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl py-4 px-4 pr-32 bg-card border border-white/6 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Paste a YouTube, Vimeo, or other public video URL" aria-invalid={!!error} />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button onClick={paste} className="px-3 py-2 bg-white/6 rounded-md hover:scale-105 transition">Paste</button>
                  <button onClick={analyze} className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-md shadow-glow hover:brightness-105 transition" aria-live="polite">Analyze</button>
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-red-400" role="alert">{error}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {status === 'loading' && (
            <div className="w-full max-w-xl mx-auto">
              <div className="p-6 glass rounded-xl animate-pulse">
                <div className="h-4 bg-white/6 rounded w-3/4 mb-4"></div>
                <div className="h-48 bg-white/3 rounded mb-4"></div>
                <div className="h-3 bg-white/6 rounded w-1/2"></div>
              </div>
            </div>
          )}
          {status === 'success' && result && <ResultCard data={result} />}
          {status === 'error' && <div className="text-red-400">Error analyzing link.</div>}
        </div>
      </div>
    </section>
  );
}
