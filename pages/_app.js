import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("ytgrab:theme");
    if (stored) setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark" || !stored);
  }, []);

  const toggleTheme = (t) => {
    const next = t === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("ytgrab:theme", next);
  };

  return <Component {...pageProps} theme={theme} onToggleTheme={() => toggleTheme(theme)} />;
}
