import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Contact</h2>
      <p className="text-center text-white/80 mt-2">Questions? Feedback? Send a quick message.</p>
      <form onSubmit={submit} className="mt-6 glass p-6 rounded-xl grid gap-4">
        <label className="sr-only">Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="p-3 rounded bg-card border border-white/6" />
        <label className="sr-only">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="p-3 rounded bg-card border border-white/6" type="email" />
        <label className="sr-only">Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="p-3 rounded bg-card border border-white/6 min-h-[120px]" />

        <div className="flex items-center justify-between">
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-md">{status === 'loading' ? 'Sending...' : 'Send Message'}</button>
          <div className="text-sm text-white/80">
            {status === 'success' && <span className="text-green-400">Sent — thanks!</span>}
            {status === 'error' && <span className="text-red-400">Please fill in all fields.</span>}
          </div>
        </div>
      </form>
      <div className="mt-4 flex gap-3 justify-center">
        <a href="#" aria-label="Twitter" className="p-2 rounded bg-white/5">🐦</a>
        <a href="#" aria-label="GitHub" className="p-2 rounded bg-white/5">🐙</a>
        <a href="#" aria-label="Discord" className="p-2 rounded bg-white/5">💬</a>
      </div>
    </div>
  );
}
