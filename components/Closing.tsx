"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <div className="overflow-hidden leading-none">
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Closing() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    // Inverted section — white background for contrast shock
    <section id="contact" ref={ref} className="bg-paper overflow-hidden">
      <div className="px-7 md:px-12 pt-24 md:pt-36 pb-20 md:pb-32">
        <motion.p
          className="text-[10px] font-medium tracking-[0.28em] uppercase text-ink/35 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Let&apos;s build something
        </motion.p>

        {/* Buttons — above the headline */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("apex:contact"))}
            data-cursor="BRAND"
            className="inline-flex items-center gap-3 bg-ink text-paper text-[10px] font-display font-black tracking-[0.18em] uppercase px-8 py-4 hover:bg-acid hover:text-ink transition-colors duration-300"
          >
            I&apos;m a Brand →
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("apex:creator"))}
            data-cursor="CREATE"
            className="inline-flex items-center gap-3 border border-ink/20 text-ink text-[10px] font-display font-black tracking-[0.18em] uppercase px-8 py-4 hover:border-ink/60 transition-colors duration-300"
          >
            I&apos;m a Creator
          </button>
        </motion.div>

        {inView && (
          <h2 className="text-ink" style={{ fontSize: "clamp(60px, 11vw, 175px)" }}>
            <Line delay={0.35} className="font-display font-black uppercase tracking-tight">
              Your Next
            </Line>
            <Line delay={0.47} className="font-serif-it text-ink/30">
              Big Idea
            </Line>
            <Line delay={0.59} className="font-display font-black uppercase tracking-tight">
              Starts Here.
            </Line>
          </h2>
        )}

        <motion.p
          className="mt-10 text-ink/25 text-[11px] tracking-widest"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          imam@apextalentgrp.com
        </motion.p>
      </div>
    </section>
  );
}
