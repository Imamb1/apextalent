"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const data = [
  { n: "25+",   l: "Happy Clients" },
  { n: "$50K+", l: "Revenue Generated" },
  { n: "100%",  l: "End-to-End Managed" },
];

export default function Numbers() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="work" className="bg-ink border-t border-paper/[0.06]">
      <div className="px-7 md:px-12 py-24 md:py-36 grid grid-cols-1 md:grid-cols-3">
        {data.map((d, i) => (
          <motion.div
            key={d.n}
            className="py-10 md:py-0 md:px-12 first:pl-0 last:pr-0 border-b md:border-b-0 md:border-l border-paper/[0.06] first:border-l-0 last:border-b-0"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
          >
            <div className="overflow-hidden">
              <motion.p
                className="font-display font-black text-paper leading-none"
                style={{ fontSize: "clamp(60px, 9vw, 130px)" }}
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 + i * 0.12 }}
              >
                {d.n}
              </motion.p>
            </div>
            <p className="mt-3 text-[10px] font-medium tracking-[0.22em] uppercase text-paper/30">
              {d.l}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
