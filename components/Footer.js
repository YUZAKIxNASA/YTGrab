export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/6 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
            <div>
              <div className="font-semibold">YTGrab</div>
              <div className="text-sm text-white/70">Fast media grabbing, no accounts.</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <h4 className="font-medium">Quick links</h4>
            <ul className="mt-2 text-sm text-white/70 space-y-1">
              <li><a href="#features">Features</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Legal</h4>
            <ul className="mt-2 text-sm text-white/70 space-y-1">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-white/60">© {new Date().getFullYear()} YTGrab. All rights reserved.
        <div className="mt-2"><a href="#home" className="text-white/80">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
