"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrandLogoGrid } from "@/components/ui/pixel-logo-grid";

export default function Brands() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="work" className="bg-ink border-t border-paper/[0.06]">
      <div className="px-7 md:px-12 pt-20 pb-10">
        <motion.p
          className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/30 mb-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>
        <motion.h2
          className="font-display font-black uppercase text-paper leading-none"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          Brand Partners
        </motion.h2>
      </div>

      <motion.div
        className="px-7 md:px-12 pb-24 md:pb-32"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
      >
        <BrandLogoGrid />
      </motion.div>
    </section>
  );
}
