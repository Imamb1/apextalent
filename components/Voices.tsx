"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const voices = [
  {
    q: "Apex found us a creator whose audience was almost surgically matched to our customers. The conversion rate was unlike anything we'd seen from paid ads.",
    name: "Sarah M.", role: "Marketing Director · SaaS",
  },
  {
    q: "They handled everything — outreach, contracts, brief, posting schedule. All we did was approve the brief and review the video. Genuinely full-service.",
    name: "James K.", role: "Growth Lead · Consumer Tech",
  },
  {
    q: "The reporting gave us real CPM breakdowns and conversion attribution. Not vanity metrics. Actual data we could use to scale the campaign.",
    name: "Priya T.", role: "Brand Manager · DTC",
  },
  {
    q: "We came in sceptical about influencer marketing. After the first campaign we doubled our budget. We haven't looked back.",
    name: "Marcus L.", role: "Founder · eCommerce",
  },
];

export default function Voices() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="bg-ink border-t border-paper/[0.06]">
      <div className="px-7 md:px-12 pt-20 pb-4">
        <motion.p
          className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/30 mb-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Client Voices
        </motion.p>
        <motion.h2
          className="font-display font-black uppercase text-paper leading-none"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          What They Say
        </motion.h2>
      </div>

      {/* Editorial list — not cards */}
      <div className="mt-8">
        {voices.map((v, i) => (
          <motion.div
            key={i}
            className="border-t border-paper/[0.07] last:border-b px-7 md:px-12 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-16 group hover:bg-paper/[0.02] transition-colors duration-500"
            data-cursor="READ"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
          >
            {/* Attribution — left column */}
            <div className="flex flex-col gap-1 md:pt-1">
              <p className="text-[13px] font-medium text-paper/80">{v.name}</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-paper/25">{v.role}</p>
            </div>

            {/* Quote — right column */}
            <p className="text-[15px] text-paper/55 leading-[1.8] font-light font-serif-it">
              &ldquo;{v.q}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
