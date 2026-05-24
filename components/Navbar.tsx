"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!ready) return null;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-500 ${
          scrolled ? "bg-ink/95 backdrop-blur-xl" : ""
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full px-7 md:px-12 flex items-center justify-between">
          <a href="#" className="font-display text-[13px] tracking-[0.35em] uppercase text-paper">
            Apex Talent<span className="text-acid">.</span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {["Services", "About", "Work", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[10px] font-medium tracking-[0.22em] uppercase text-paper/35 hover:text-paper transition-colors duration-200"
                data-cursor="GO"
              >
                {l}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:block text-[10px] font-medium tracking-[0.2em] uppercase text-paper/35 hover:text-paper transition-colors border-b border-paper/20 hover:border-paper/60 pb-px"
            data-cursor="GO"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden flex flex-col gap-[5px]" aria-label="Menu">
            <span className={`block w-[22px] h-px bg-paper transition-transform duration-300 ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-[22px] h-px bg-paper transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-px bg-paper transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {["Services", "About", "Work", "Contact"].map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-display text-[28px] tracking-[0.15em] uppercase text-paper/70 hover:text-paper"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
