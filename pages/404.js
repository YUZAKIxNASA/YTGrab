import Link from "next/link";

export default function Custom404() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-xl p-8">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="mt-4 text-lg text-white/80">Page not found — looks like you took a wrong turn.</p>
        <Link href="/"><a className="mt-6 inline-block px-6 py-3 rounded bg-gradient-to-r from-primary to-accent">Back to Home</a></Link>
      </div>
    </main>
  );
}
