import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { streamDownloadToBlob, buildDownloadUrl } from '../client/api';

export default function DownloadManager({ url, formatId, onClose, title }) {
  const [state, setState] = useState('starting'); // starting, streaming, fallback, done, error
  const [progress, setProgress] = useState({ percent:0, speed:0, eta:null });
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    controllerRef.current = controller;

    async function start() {
      try {
        setState('streaming');
        const res = await streamDownloadToBlob(url, formatId, (p)=>{
          if(!mounted) return;
          setProgress({ percent: p.percent || 0, speed: p.speed || 0, eta: p.eta || null });
        }, { signal: controller.signal });

        if (res && res.fallback) {
          setState('fallback');
          // open fallback URL in new tab
          window.open(res.url, '_blank');
          setState('done');
          onClose?.();
          return;
        }

        // create blob download
        const blob = res.blob;
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        const safeTitle = (title || 'download').replace(/[^a-z0-9\.\-_]/gi, '_').slice(0,120);
        a.download = `${safeTitle}_${formatId}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
        setState('done');
        onClose?.();
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Download canceled');
          setState('error');
        } else {
          console.error(err);
          setError(err.message || 'Download failed');
          setState('error');
        }
      }
    }

    start();
    return () => { mounted = false; controller.abort(); };
  }, [url, formatId, onClose, title]);

  const onCancel = () => {
    controllerRef.current?.abort();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => { /* allow clicking backdrop? keep open */ }} />

      <motion.div initial={{ y: 12 }} animate={{ y: 0 }} className="bg-card rounded-xl p-6 z-60 w-[min(920px,95%)] border border-white/6">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">Downloading</div>
            <div className="text-sm text-white/70">{title}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/70">{state}</div>
            <button onClick={onCancel} className="ml-3 px-3 py-1 rounded-md bg-white/6 text-sm">Cancel</button>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-3 bg-white/6 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.min(100, progress.percent||0)}%` }} />
          </div>
          <div className="mt-2 text-sm text-white/70">{progress.percent ? `${Math.round(progress.percent)}%` : ''} {progress.speed ? `• ${Math.round(progress.speed/1024)} kB/s` : ''} {progress.eta ? `• ETA ${progress.eta}s` : ''}</div>
        </div>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => { window.open(buildDownloadUrl(url, formatId), '_blank'); }} className="px-4 py-2 rounded-md bg-white/6">Open fallback</button>
          <button onClick={() => onClose?.()} className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
