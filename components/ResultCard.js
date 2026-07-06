export default function ResultCard({ data }) {
  if (!data) return null;

  const onDownload = (formatId) => {
    // open download URL in new tab - backend handles streaming
    const url = `/api/download?url=${encodeURIComponent(data.link)}&format_id=${encodeURIComponent(formatId)}`;
    window.open(url, '_blank');
  };

  return (
    <article className="max-w-3xl mx-auto mt-6 glass rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <img src={data.thumbnail} alt={`${data.title} thumbnail`} className="w-full rounded-md object-cover" loading="lazy" />
      </div>

      <div className="md:col-span-2 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <p className="text-sm text-white/80">{data.channel} • {data.uploadDate} • {data.duration}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-2">Available formats</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.formats) && data.formats.length ? data.formats.map((f)=> (
                <div key={f.id} className="px-3 py-2 bg-white/3 rounded-md text-sm flex items-center gap-2">
                  <span className="font-medium">{f.quality || f.format || (f.height? `${f.height}p` : f.ext)}</span>
                  <span className="text-xs text-white/60">• {f.sizeBytes ? Math.round(f.sizeBytes/1024/1024 *10)/10 + ' MB' : '—'}</span>
                </div>
              )) : <div className="text-sm text-white/60">No formats available</div>}
            </div>
          </div>

          <div className="flex gap-2">
            <a className="px-4 py-2 bg-white/6 rounded-md hover:bg-white/8" href={data.link} target="_blank" rel="noreferrer">Open Link</a>
            <button onClick={() => navigator.clipboard?.writeText(data.link)} className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-md">Copy Link</button>
          </div>
        </div>

        <div className="mt-2 text-sm text-white/70">Select a format and click Download to start.</div>

        <div style={{marginTop:12}}>
          {Array.isArray(data.formats) && data.formats.length ? data.formats.map((f)=> (
            <div key={f.id} style={{marginBottom:8}} className="format">
              <div style={{display:'flex',flexDirection:'column'}}>
                <div className="quality">{f.quality} <span style={{color:'var(--muted)',fontWeight:600}}>· {f.ext?.toUpperCase() || f.ext}</span></div>
                <div className="file-size">{f.sizeBytes ? Math.round(f.sizeBytes/1024/1024*10)/10 + ' MB' : '-'}</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
                <div className="badge">{f.quality}</div>
                <div style={{display:'flex',gap:8}}>
                  <button className="download-btn" onClick={() => onDownload(f.id)}>Download</button>
                </div>
              </div>
            </div>
          )) : null }
        </div>
      </div>
    </article>
  );
}
