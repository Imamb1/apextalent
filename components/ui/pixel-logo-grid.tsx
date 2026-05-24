"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/* ─── Pixel Canvas ───────────────────────────────────────────────────────── */

type Pixel = {
  x: number; y: number; color: string; ctx: CanvasRenderingContext2D;
  speed: number; size: number; sizeStep: number; minSize: number;
  maxSizeInt: number; maxSize: number; delay: number; counter: number;
  counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean;
  draw(): void; appear(): void; disappear(): void; shimmer(): void;
};

function createPixel(
  ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement,
  x: number, y: number, color: string, baseSpeed: number, delay: number
): Pixel {
  const rand = (a: number, b: number) => Math.random() * (b - a) + a;
  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0, sizeStep: Math.random() * 0.4, minSize: 0.5,
    maxSizeInt: 2, maxSize: rand(0.5, 2),
    delay, counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false, isReverse: false, isShimmer: false,
    draw() {
      const off = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + off, p.y + off, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) { p.counter += p.counterStep; return; }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false; p.counter = 0;
      if (p.size <= 0) { p.isIdle = true; return; }
      p.size -= 0.1; p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed; else p.size += p.speed;
    },
  };
  return p;
}

function PixelCanvas({ colors, gap = 5, speed = 30 }: { colors: string[]; gap?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animRef   = useRef<number>(0);
  const lastFrame = useRef(performance.now());
  const noMotion  = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current; const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width); const h = Math.floor(height);
    canvas.width = w; canvas.height = h;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    const eff = noMotion.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2; const dy = y - h / 2;
        const delay = noMotion.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, eff, delay));
      }
    }
    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animRef.current);
    const interval = 1000 / 60;
    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      const now = performance.now(); const elapsed = now - lastFrame.current;
      if (elapsed < interval) return;
      lastFrame.current = now - (elapsed % interval);
      const canvas = canvasRef.current; const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();
      if (pixels.every((p) => p.isIdle)) cancelAnimationFrame(animRef.current);
    };
    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    noMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();
    const ro = new ResizeObserver(() => init());
    if (wrapRef.current) ro.observe(wrapRef.current);
    const card = wrapRef.current?.parentElement;
    const enter = () => animate("appear");
    const leave = () => animate("disappear");
    card?.addEventListener("mouseenter", enter);
    card?.addEventListener("mouseleave", leave);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
      card?.removeEventListener("mouseenter", enter);
      card?.removeEventListener("mouseleave", leave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* ─── Brand SVG Wordmarks ─────────────────────────────────────────────────
 * ALL logos share:
 *   viewBox height = 32   (consistent coordinate space)
 *   font-size      = 16px (same visual weight after scaling)
 *   font-weight    = 700
 *   y              = 21   (optically centred in 32-unit space)
 *   rendered height = 22px (set in BRANDS array)
 * viewBox width varies per brand to fit the text — this only affects width,
 * not height, so all logos render at exactly the same visual text height.
 * ─────────────────────────────────────────────────────────────────────────*/

type LogoSvgProps = { className?: string; style?: React.CSSProperties };

const FONT = "'Outfit', system-ui, sans-serif";
const FS   = "16px";
const FW   = 700;
const Y    = 21;

function CleanMyMacLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 136 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="68" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.2px" }}>
        CleanMyMac
      </text>
    </svg>
  );
}

function TelloLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="39" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Tello
      </text>
    </svg>
  );
}

function SurfsharkLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Shark fin */}
      <path d="M6 24 L13 7 L17 16 L20 24 Z" fill="currentColor" opacity="0.75" />
      <text x="70" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.2px" }}>
        Surfshark
      </text>
    </svg>
  );
}

function PlaudLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 112 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="56" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.5px" }}>
        PLAUD AI
      </text>
    </svg>
  );
}

function NottaLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="50" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Notta AI
      </text>
    </svg>
  );
}

function RosettaLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 138 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="69" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Rosetta Stone
      </text>
    </svg>
  );
}

function RayconLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 94 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="47" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: 900, fontSize: FS, letterSpacing: "2px" }}>
        RAYCON
      </text>
    </svg>
  );
}

function SailyLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="36" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Saily
      </text>
    </svg>
  );
}

function IncogniLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="48" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.2px" }}>
        Incogni
      </text>
    </svg>
  );
}

function UgreenLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="48" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: 800, fontSize: FS, letterSpacing: "1.5px" }}>
        UGREEN
      </text>
    </svg>
  );
}

function RecallLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 106 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <text x="53" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Recall AI
      </text>
    </svg>
  );
}

function FramerLogo({ className, style }: LogoSvgProps) {
  return (
    <svg viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Framer F mark */}
      <path d="M5 5h14v8H5zM5 13h7l7 9H5z" fill="currentColor" />
      <text x="60" y={Y} textAnchor="middle" fill="currentColor"
        style={{ fontFamily: FONT, fontWeight: FW, fontSize: FS, letterSpacing: "0.3px" }}>
        Framer
      </text>
    </svg>
  );
}

/* ─── Brand data ─────────────────────────────────────────────────────────── */

type Brand = {
  name: string;
  url: string;
  brandColor: string;
  pixelColors: string[];
  row: number;
  col: number;
  Svg: React.ComponentType<LogoSvgProps>;
};

/* All logos render at height: 22px — same visual size across the grid */
const LOGO_H = 22;

const BRANDS: Brand[] = [
  // ── Row 1 ──────────────────────────────────────────────────────────────
  {
    name: "CleanMyMac", url: "https://cleanmymac.com",
    brandColor: "#4A9EE8", pixelColors: ["#4A9EE8","#2D7DC8","#6BB8F0"],
    row: 1, col: 1, Svg: CleanMyMacLogo,
  },
  {
    name: "Tello", url: "https://tello.com",
    brandColor: "#00D58E", pixelColors: ["#00D58E","#00A87E","#33DFB0"],
    row: 1, col: 2, Svg: TelloLogo,
  },
  {
    name: "Surfshark", url: "https://surfshark.com",
    brandColor: "#1BD3C1", pixelColors: ["#1BD3C1","#14B8A6","#4FD1C5"],
    row: 1, col: 3, Svg: SurfsharkLogo,
  },
  {
    name: "PLAUD AI", url: "https://plaud.ai",
    brandColor: "#A855F7", pixelColors: ["#A855F7","#9333EA","#C084FC"],
    row: 1, col: 4, Svg: PlaudLogo,
  },
  {
    name: "Notta AI", url: "https://notta.ai",
    brandColor: "#60A5FA", pixelColors: ["#60A5FA","#3B82F6","#93C5FD"],
    row: 1, col: 5, Svg: NottaLogo,
  },

  // ── Row 2 sides (cols 2-4 = center text block) ─────────────────────────
  {
    name: "Rosetta Stone", url: "https://rosettastone.com",
    brandColor: "#5B9EFF", pixelColors: ["#5B9EFF","#3B80F0","#7DB3FF"],
    row: 2, col: 1, Svg: RosettaLogo,
  },
  {
    name: "Raycon", url: "https://rayconglobal.com",
    brandColor: "#C8A96E", pixelColors: ["#C8A96E","#D4AF6A","#B8963E"],
    row: 2, col: 5, Svg: RayconLogo,
  },

  // ── Row 3 sides ────────────────────────────────────────────────────────
  {
    name: "Saily", url: "https://saily.com",
    brandColor: "#4E9EFF", pixelColors: ["#4E9EFF","#0066FF","#80B8FF"],
    row: 3, col: 1, Svg: SailyLogo,
  },
  {
    name: "Incogni", url: "https://incogni.com",
    brandColor: "#F87171", pixelColors: ["#F87171","#EF4444","#FCA5A5"],
    row: 3, col: 5, Svg: IncogniLogo,
  },

  // ── Row 4 ──────────────────────────────────────────────────────────────
  {
    name: "UGREEN", url: "https://ugreen.com",
    brandColor: "#22C55E", pixelColors: ["#22C55E","#16A34A","#4ADE80"],
    row: 4, col: 1, Svg: UgreenLogo,
  },
  {
    name: "Recall AI", url: "https://www.recall.it/",
    brandColor: "#A78BFA", pixelColors: ["#A78BFA","#8B5CF6","#C4B5FD"],
    row: 4, col: 2, Svg: RecallLogo,
  },
  {
    name: "Framer", url: "https://framer.com",
    brandColor: "#3B82F6", pixelColors: ["#3B82F6","#2563EB","#60A5FA"],
    row: 4, col: 3, Svg: FramerLogo,
  },
];

/* ─── Logo card ──────────────────────────────────────────────────────────── */

const CARD_BG  = "#0F0F0D";
const GRID_GAP = "rgba(242,240,236,0.055)";

function LogoCard({ brand }: { brand: Brand }) {
  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      title={brand.name}
      className={cn(
        "group relative grid place-items-center overflow-hidden select-none isolate",
        "transition-all duration-300 hover:z-[2]",
        "hover:shadow-[0_8px_28px_-6px_color-mix(in_srgb,var(--brand)_30%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_50%,transparent)]"
      )}
      style={{
        "--brand":       brand.brandColor,
        backgroundColor: CARD_BG,
        gridRow:         brand.row,
        gridColumn:      brand.col,
        cursor:          "pointer",
      } as React.CSSProperties}
    >
      <PixelCanvas colors={brand.pixelColors} gap={5} speed={28} />
      <brand.Svg
        className="relative z-[1] w-auto transition-all duration-300 group-hover:scale-[1.07] group-hover:text-[var(--brand)]"
        style={{
          height:    `${LOGO_H}px`,
          maxHeight: `${LOGO_H}px`,
          color:     "rgba(242,240,236,0.28)",
        }}
      />
    </a>
  );
}

/* ─── Empty cell (awaiting brands) ──────────────────────────────────────── */

function EmptyCell({ row, col }: { row: number; col: number }) {
  return (
    <div
      style={{ backgroundColor: CARD_BG, gridRow: row, gridColumn: col }}
      className="relative overflow-hidden"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`d-${row}-${col}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#F2F0EC" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${row}-${col})`} />
      </svg>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export function BrandLogoGrid() {
  return (
    <div className="overflow-x-auto -mx-7 md:mx-0 px-7 md:px-0">
      <div
        className="min-w-[580px] md:min-w-0 grid grid-cols-5 mx-auto"
        style={{
          maxWidth:          "1100px",
          gridTemplateRows:  "repeat(4, 92px)",
          gap:               "1px",
          background:        GRID_GAP,
          border:            `1px solid ${GRID_GAP}`,
        }}
      >
        {BRANDS.map((brand) => (
          <LogoCard key={brand.name} brand={brand} />
        ))}

        {/* ── Center text block ────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center justify-center gap-4"
          style={{ gridColumn: "2 / span 3", gridRow: "2 / span 2", backgroundColor: CARD_BG }}
        >
          <span
            className="inline-flex items-center px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase rounded-full"
            style={{
              background: "rgba(232,255,0,0.06)",
              border:     "1px solid rgba(232,255,0,0.2)",
              color:      "#E8FF00",
            }}
          >
            Brands We&apos;ve Worked With
          </span>
          <p
            className="text-center leading-tight px-4"
            style={{
              fontSize:   "clamp(13px, 2.2vw, 20px)",
              color:      "rgba(242,240,236,0.55)",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            Trusted by top brands<br />across different sectors
          </p>
        </div>

        {/* ── Empty cells — add more brands here ───────────────────────── */}
        <EmptyCell row={4} col={4} />
        <EmptyCell row={4} col={5} />
      </div>
    </div>
  );
}
