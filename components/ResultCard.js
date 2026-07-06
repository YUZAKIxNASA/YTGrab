import { useState } from 'react';
import { motion } from 'framer-motion';
import QualityCard from './QualityCard';
import DownloadManager from './DownloadManager';

export default function ResultCard({ data }) {
  const [descOpen, setDescOpen] = useState(false);
  const [downloading, setDownloading] = useState(null); // format id

  if (!data) return null;

  const formats = Array.isArray(data.formats) ? data.formats : [];

  const videoFormats = formats.filter(f => f.ext && f.ext.toLowerCase() !== 'mp3' && f.ext.toLowerCase() !== 'm4a' && f.ext.toLowerCase() !== 'aac');
  const audioFormats = formats.filter(f => ['mp3','m4a','aac'].includes((f.ext||'').toLowerCase()));

  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="result-card max-w-4xl mx-auto mt-6 glass rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <motion.img layoutId={`thumb-${data.link}`} src={data.thumbnail} alt={`${data.title} thumbnail`} className="w-full rounded-md object-cover shadow-soft" loading="lazy" />
      </div>

      <div className="md:col-span-3 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold leading-tight">{data.title}</h3>
            <p className="text-sm text-white/80 mt-1">{data.channel} · {data.uploadDate} · {data.duration}</p>
            <div className="text-sm text-white/70 mt-2">{data.views ? `${data.views.toLocaleString?.() || data.views} views` : ''}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a className="px-3 py-2 bg-white/6 rounded-md hover:bg-white/8 text-sm" href={data.link} target="_blank" rel="noreferrer">Open on YouTube</a>
            <button className="px-3 py-2 bg-gradient-to-r from-primary to-accent rounded-md text-sm" onClick={() => navigator.clipboard?.writeText(data.link)}>Copy Link</button>
          </div>
        </div>

        <div>
          <button aria-expanded={descOpen} onClick={() => setDescOpen(s => !s)} className="text-sm text-white/70 underline-offset-2 hover:underline">{descOpen ? 'Hide' : 'Show'} description</button>
          {descOpen && <div className="mt-3 text-sm text-white/75 leading-relaxed max-h-40 overflow-auto p-3 bg-card/60 rounded-md border border-white/4">{data.description || 'No description available.'}</div>}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Available video qualities</h4>
          {videoFormats.length === 0 && <div className="text-sm text-white/60">No video formats available.</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {videoFormats.map(f => (
              <QualityCard key={f.id} format={f} onDownload={(id) => setDownloading(id)} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Audio formats</h4>
          <div className="flex gap-3 flex-wrap">
            {audioFormats.length === 0 && <div className="text-sm text-white/60">No audio formats available.</div>}
            {audioFormats.map(f => (
              <QualityCard key={f.id} format={f} onDownload={(id) => setDownloading(id)} />
            ))}
          </div>
        </div>

        {/* Download manager overlay */}
        {downloading && <DownloadManager url={data.link} formatId={downloading} onClose={() => setDownloading(null)} title={data.title} />}
      </div>
    </motion.article>
  );
}
