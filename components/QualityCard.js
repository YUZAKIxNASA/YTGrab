import { motion } from 'framer-motion';

export default function QualityCard({ format, onDownload }) {
  const quality = format.quality || (format.height ? `${format.height}p` : (format.format || format.ext || '—'));
  const ext = (format.ext || format.format || '').toUpperCase();
  const size = format.sizeBytes ? (Math.round(format.sizeBytes/1024/1024*10)/10) + ' MB' : '-';
  const codec = format.vcodec || format.acodec || format.codec || '—';

  return (
    <motion.div whileHover={{ y: -6 }} className="quality-card p-4 rounded-xl border border-white/6 bg-card/40">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{quality}</div>
          <div className="text-xs text-white/60 mt-1">{ext} • {codec}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{size}</div>
          <button onClick={() => onDownload(format.id)} className="mt-3 px-3 py-1 rounded-md bg-gradient-to-r from-primary to-accent text-sm">Download</button>
        </div>
      </div>
    </motion.div>
  );
}
