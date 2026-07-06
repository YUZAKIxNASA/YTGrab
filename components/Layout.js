import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children, theme, onToggleTheme }) {
  return (
    <div className="bg-background min-h-screen text-white">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  );
}
