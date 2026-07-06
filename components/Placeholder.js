export default function Placeholder(){
  return (
    <div className="min-h-[180px] flex flex-col gap-4">
      <div className="w-full h-40 rounded-lg bg-gradient-to-r from-[#0f1724] to-[#0b1220] border border-white/4 flex items-center justify-center">
        <svg width="160" height="90" viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>
          </defs>
          <rect width="160" height="90" rx="12" fill="url(#g)" opacity="0.12" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontFamily="Inter, Arial" fontSize="12">Preview</text>
        </svg>
      </div>

      <div className="h-3 rounded bg-white/3 w-3/4 skeleton" />
      <div className="h-3 rounded bg-white/3 w-1/2 skeleton" />
      <div className="flex gap-2 mt-2">
        <div className="pill">Fast</div>
        <div className="pill">Secure</div>
      </div>
    </div>
  );
}
