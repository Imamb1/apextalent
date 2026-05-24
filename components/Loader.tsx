"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exit,  setExit]  = useState(false);

  useEffect(() => {
    // Count 0 → 100 over ~1.6s with easing
    let start: number;
    const duration = 1600;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 100));
      if (p < 1) requestAnimationFrame(raf);
      else {
        setCount(100);
        setTimeout(() => { setExit(true); setTimeout(onDone, 700); }, 300);
      }
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9000] bg-ink flex flex-col items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.p
            className="font-display text-[13px] tracking-[0.5em] uppercase text-paper mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Apex Talent Group
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-paper/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-acid"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Counter */}
          <p className="mt-5 font-display text-[11px] tracking-[0.3em] text-paper/25">
            {String(count).padStart(3, "0")}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
