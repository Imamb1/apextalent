"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const services = [
  {
    n: "01",
    title: "Creator Sourcing",
    short: "YouTube · Instagram · TikTok",
    body: "We dig into data — not follower counts — to find creators whose audiences genuinely trust their recommendations. Engagement quality, audience demographics, category relevance. No guesswork.",
  },
  {
    n: "02",
    title: "Influencer Strategy",
    short: "Planning · Briefs · Direction",
    body: "Every campaign starts with a strategy built around your specific goals. We design creator integrations that convert — not just ones that look good on paper.",
  },
  {
    n: "03",
    title: "Campaign Management",
    short: "End-to-End Execution",
    body: "Outreach, negotiation, contracts, script review, scheduling, posting coordination. We handle every moving part so your team focuses on results, not admin.",
  },
  {
    n: "04",
    title: "UGC Production",
    short: "Ads · Social · Storytelling",
    body: "High-quality user-generated content built for paid ads, organic social, and brand storytelling. Real creators, real content, repurposed across every channel.",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="bg-ink">
      <div className="px-7 md:px-12 pt-20 pb-6">
        <motion.p
          className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/30 mb-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.p>
        <motion.h2
          className="font-display font-black uppercase leading-none text-paper"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          Services
        </motion.h2>
      </div>

      {/* Accordion rows — full width, no container constraint */}
      <div className="mt-4">
        {services.map((s, i) => (
          <ServiceRow
            key={s.n}
            service={s}
            i={i}
            isOpen={active === i}
            onToggle={() => setActive(active === i ? null : i)}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service, i, isOpen, onToggle, inView,
}: {
  service: typeof services[0];
  i: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      className="border-t border-paper/[0.07] last:border-b"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
    >
      <button
        onClick={onToggle}
        data-cursor={isOpen ? "CLOSE" : "OPEN"}
        className="group w-full px-7 md:px-12 py-7 md:py-9 flex items-center gap-6 md:gap-10 text-left"
      >
        {/* Number */}
        <span className="font-display text-[11px] font-black tracking-[0.2em] text-paper/20 w-8 flex-shrink-0">
          {service.n}
        </span>

        {/* Title — slides right slightly on hover */}
        <motion.span
          className={`font-display font-black uppercase leading-none flex-1 transition-colors duration-300 ${isOpen ? "text-acid" : "text-paper group-hover:text-paper/70"}`}
          style={{ fontSize: "clamp(22px, 3.5vw, 48px)" }}
          animate={{ x: isOpen ? 8 : 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          {service.title}
        </motion.span>

        {/* Short tag — hidden when open */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="hidden md:block text-[10px] tracking-[0.18em] uppercase text-paper/25 flex-shrink-0"
            >
              {service.short}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Chevron */}
        <motion.span
          className="flex-shrink-0 text-paper/30 text-lg"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>

      {/* Expand body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-12 pb-10 pl-[calc(2rem+2.5rem)] md:pl-[calc(3rem+3.5rem)]">
              <p className="max-w-xl text-[14px] text-paper/50 leading-[1.9] font-light">
                {service.body}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-display font-black tracking-[0.18em] uppercase text-acid border-b border-acid/30 hover:border-acid pb-px transition-colors"
                data-cursor="GO"
              >
                Start a campaign →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
