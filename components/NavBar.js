import { useState } from "react";

export default function NavBar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur glass border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 22v-20l18 10-18 10z" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-lg">YTGrab</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 ml-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-accent transition">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onToggleTheme} aria-label="Toggle theme" className="p-2 rounded-md hover:bg-white/5 transition">
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <div className="md:hidden">
              <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open Menu" className="p-2 rounded-md hover:bg-white/5">
                ☰
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="px-2 py-2 rounded hover:bg-white/3">
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
