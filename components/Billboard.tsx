"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Billboard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Scroll down → text moves left (parallax billboard)
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  const text = "INFLUENCE · CONNECT · CONVERT · INFLUENCE · CONNECT · CONVERT · ";

  return (
    <div ref={ref} className="overflow-hidden border-y border-paper/[0.06] bg-ink py-5 md:py-7">
      <motion.div className="whitespace-nowrap" style={{ x }}>
        <span
          className="font-display font-black uppercase text-paper/[0.06] select-none"
          style={{ fontSize: "clamp(64px, 12vw, 160px)", letterSpacing: "-0.02em" }}
        >
          {text.repeat(3)}
        </span>
      </motion.div>
    </div>
  );
}
