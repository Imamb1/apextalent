import type { ReactNode } from "react";

/** Plain reading layout for legal pages. These pages skip the custom cursor, so the normal one is restored. */
export default function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <style>{`body, a, button { cursor: auto !important; } a { cursor: pointer !important; }`}</style>
      <div className="mx-auto max-w-[760px] px-6 md:px-10 py-16 md:py-24">
        <a href="/" className="font-display text-[12px] tracking-[0.35em] uppercase text-paper/50 hover:text-paper transition-colors">
          Apex Talent<span className="text-acid">.</span>
        </a>
        <p className="mt-14 text-[11px] tracking-[0.25em] uppercase text-paper/40">{eyebrow}</p>
        <h1 className="font-display font-bold text-[34px] md:text-[48px] leading-[1.05] mt-3">{title}</h1>
        <p className="mt-4 text-[13px] text-paper/40">Last updated {updated}</p>
        <div className="legal mt-12 space-y-10 text-[15.5px] leading-[1.75] text-paper/80">{children}</div>
        <p className="mt-16 pt-6 border-t border-paper/10 text-[12px] text-paper/35">
          Apex Talent Group is a trading name of Influsync PTY LTD, Australia.
        </p>
      </div>
    </main>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[16px] tracking-wide text-paper mb-3">{title}</h2>
      <div className="space-y-3 [&_a]:text-acid [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_li]:mt-1">{children}</div>
    </section>
  );
}
