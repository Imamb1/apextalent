"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [pos, setPos]       = useState({ x: -100, y: -100 });
  const [label, setLabel]   = useState("");
  const [clicked, setClick] = useState(false);
  const raf = useRef<number>(0);
  const curr = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    const down = () => setClick(true);
    const up   = () => setClick(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const loop = () => {
      curr.current.x += (target.current.x - curr.current.x) * 0.12;
      curr.current.y += (target.current.y - curr.current.y) * 0.12;
      setPos({ x: curr.current.x, y: curr.current.y });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    // Label swap on interactive elements
    const over = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-cursor]");
      setLabel(el ? (el.getAttribute("data-cursor") ?? "") : "");
    };
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const hasLabel = label.length > 0;

  return (
    <motion.div
      className="fixed z-[9998] pointer-events-none select-none flex items-center justify-center"
      style={{
        left: pos.x,
        top:  pos.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width:  hasLabel ? 80 : clicked ? 6 : 10,
        height: hasLabel ? 80 : clicked ? 6 : 10,
        backgroundColor: hasLabel ? "#E8FF00" : "rgba(242,240,236,0.9)",
        borderRadius: "50%",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
    >
      {hasLabel && (
        <span className="text-[9px] font-display font-black tracking-[0.12em] uppercase text-ink leading-none text-center">
          {label}
        </span>
      )}
    </motion.div>
  );
}
