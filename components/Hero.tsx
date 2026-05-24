"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Each line clips up from beneath — not a fade, a physical reveal
function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <div className="overflow-hidden leading-none">
      <motion.div
        initial={{ y: "102%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Headline moves up as you scroll (parallax)
  const headlineY   = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const headlineOp  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY        = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex flex-col justify-between pt-[60px] overflow-hidden bg-ink">

      {/* Top rule */}
      <motion.div
        className="absolute top-[60px] left-0 right-0 h-px bg-paper/[0.06]"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      />

      {/* ── Main headline ─────────────────────────── */}
      <motion.div
        className="flex-1 flex items-end px-7 md:px-12 pb-12 md:pb-16"
        style={{ y: headlineY, opacity: headlineOp }}
      >
        <div className="w-full">
          {/* Eyebrow */}
          <motion.p
            className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/30 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Influencer Marketing Agency · Melbourne
          </motion.p>

          {/* Headline — mix of Unbounded and Instrument Serif italic */}
          <h1 style={{ fontSize: "clamp(56px, 11.5vw, 185px)" }}>
            <Line delay={0.35} className="font-display font-black tracking-tight text-paper uppercase">
              Connect.
            </Line>
            <Line delay={0.5} className="font-serif-it text-paper/70">
              Influence.
            </Line>
            <Line delay={0.65} className="font-display font-black tracking-tight text-paper uppercase">
              Convert.
            </Line>
          </h1>
        </div>
      </motion.div>

      {/* ── Bottom meta bar ────────────────────────── */}
      <motion.div
        className="border-t border-paper/[0.06] px-7 md:px-12 py-7 flex flex-col md:flex-row md:items-center gap-6 md:gap-0"
        style={{ y: subY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        <p className="max-w-xs text-[13px] text-paper/40 leading-relaxed font-light md:mr-auto">
          We connect brands with high-performing creators to drive awareness, conversions, and long-term trust.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            data-cursor="LET'S GO"
            className="group inline-flex items-center gap-3 bg-paper text-ink text-[10px] font-display font-black tracking-[0.15em] uppercase px-6 py-3.5 hover:bg-acid transition-colors duration-300"
          >
            Work with us
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
          <a
            href="#services"
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-paper/30 hover:text-paper/70 transition-colors border-b border-paper/15 hover:border-paper/40 pb-px"
          >
            Our services ↓
          </a>
        </div>

        {/* Right: scroll label */}
        <div className="hidden md:flex items-center gap-4 md:ml-12">
          <div className="w-10 h-px bg-paper/15 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-paper/60"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-paper/20">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
