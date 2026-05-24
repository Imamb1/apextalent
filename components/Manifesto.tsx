"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Scroll-driven word reveal — 21st.dev TextReveal pattern
// Words go from dim (0.08 opacity) to full (1.0) based on scroll progress through the section
const WORDS = "We help ambitious brands grow through creator partnerships that actually convert. We move fast, think strategically, and execute campaigns with purpose.".split(" ");

export default function Manifesto() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.85", "end 0.3"],
  });

  return (
    <section ref={container} className="bg-ink border-t border-paper/[0.06] py-28 md:py-44 px-7 md:px-12">
      <div className="max-w-4xl">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/25 mb-12">
          Our Philosophy
        </p>
        <p
          className="font-serif-it leading-[1.2]"
          style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          aria-label={WORDS.join(" ")}
        >
          {WORDS.map((word, i) => {
            const start = i / WORDS.length;
            const end   = (i + 1) / WORDS.length;
            return <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y       = useTransform(progress, [start, Math.min(end + 0.05, 1)], [6, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.3em] text-paper"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}
