import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { q: "Is there an account required?", a: "No — YTGrab is fully front-facing. No login, no accounts." },
  { q: "What video sources are supported?", a: "The UI supports public links. Backend determines supported providers." },
  { q: "Are downloads rate-limited?", a: "Rate limits are a backend concern; the UI handles errors gracefully." },
  { q: "How is privacy handled?", a: "No user accounts or tracking is implemented in this UI scaffold." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <motion.div key={it.q} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-lg p-4">
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="w-full text-left flex justify-between items-center gap-4">
                <span className="font-medium">{it.q}</span>
                <span aria-hidden>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="mt-3 text-sm text-white/80">{it.a}</div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
