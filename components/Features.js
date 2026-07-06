import { motion } from "framer-motion";

const cards = [
  { title: "Fast Processing", desc: "Blazing-fast analysis and downloads." },
  { title: "Responsive Design", desc: "Mobile-first and pixel-perfect." },
  { title: "Clean Interface", desc: "No clutter, just results." },
  { title: "Multiple Format Support", desc: "Video & audio formats." },
  { title: "High Performance", desc: "Optimized for speed." },
  { title: "Modern Animations", desc: "Subtle, buttery animations." },
  { title: "Secure Connection", desc: "HTTPS-first architecture." },
  { title: "Easy to Use", desc: "Paste, analyze, download." },
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Features</h2>
      <p className="text-center text-white/80 mt-2">Everything you need to quickly grab media.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div key={c.title} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="glass p-5 rounded-xl shadow-soft" role="article" aria-label={c.title}>
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" fill="white" />
              </svg>
            </div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-white/80">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
