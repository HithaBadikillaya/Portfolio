// React runtime automatic; no imports needed here

/**
 * Footer Component
 * 
 * Why: Strong visual identity to cap off the editorial experience.
 */
export const Footer = () => {
  return (
    <footer id="site-footer" className="mt-12 border-t border-primary/10 py-12 px-6 md:px-12 lg:px-48 bg-primary text-paper">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-sans text-bg-secondary tracking-tight">Hitha Badikillaya.</h2>
          <p className="max-w-xs text-[10px] md:text-xs uppercase tracking-widest leading-loose opacity-60">
            Full Stack Developer & Open Source Advocate.
            Engineering reliable systems in India.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold w-full lg:w-auto">
          <div className="space-y-4">
            <p className="opacity-30">Selection</p>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-secondary transition-colors">Index</a></li>
              <li><a href="/projects" className="hover:text-secondary transition-colors">Works</a></li>
              <li><a href="/about" className="hover:text-secondary transition-colors">About</a></li>
              <li><a href="/experience" className="hover:text-secondary transition-colors">Experience</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="opacity-30">Social</p>
            <ul className="space-y-3">
              <li><a href="https://linkedin.com/in/hitha-badikillaya" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/HithaBadikillaya" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">GitHub</a></li>
              <li><a href="mailto:hithabadikillaya@gmail.com" className="hover:text-secondary transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-paper/10 pt-10 text-[10px] uppercase tracking-widest opacity-40 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p>© 2026 Hitha Badikillaya</p>
          <p className="opacity-40 hover:opacity-100 transition-opacity cursor-help hidden md:block">Sequence: ↑ ↑ ↓ ↓</p>
        </div>
        <div className="flex gap-4 md:gap-8">
          <span>Privacy</span>
          <span>Terms</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-secondary transition-colors">Back to Top ↑</button>
        </div>
      </div>
    </footer>
  );
};
