export default function About() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold">About YTGrab</h2>
      <p className="mt-3 text-white/80">
        YTGrab is a lightweight, privacy-minded interface that makes grabbing public media links simple. The design prioritizes clarity,
        performance, and accessibility so you get results immediately without distractions.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl">
          <h3 className="font-semibold">Design philosophy</h3>
          <p className="mt-2 text-sm text-white/80">Minimal, professional UI with glass effects, careful spacing, and refined animations.</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="font-semibold">Developer friendly</h3>
          <p className="mt-2 text-sm text-white/80">Component-first, easy to connect to any API for parsing and downloading media.</p>
        </div>
      </div>
    </div>
  );
}
