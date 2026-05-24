export default function Footer() {
  return (
    <footer className="bg-ink border-t border-paper/[0.06] px-7 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-3">
      <a href="#top" className="font-display text-[12px] tracking-[0.35em] uppercase text-paper/40 hover:text-paper transition-colors">
        Apex Talent<span className="text-acid">.</span>
      </a>
      <p className="text-[10px] tracking-widest text-paper/15">
        © 2026 Apex Talent Group
      </p>
      <div className="flex gap-7">
        {["LinkedIn", "Privacy", "Terms"].map((l) => (
          <a key={l} href="#" className="text-[10px] tracking-[0.18em] uppercase text-paper/20 hover:text-paper/50 transition-colors">
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}
