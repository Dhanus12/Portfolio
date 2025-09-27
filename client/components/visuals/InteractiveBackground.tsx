import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let cx = 0.5;
    let cy = 0.5;
    let tx = 0.5;
    let ty = 0.5;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--mx", `${(cx * 100).toFixed(3)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(3)}%`);
      el.style.setProperty("--tx1", `${((cx - 0.5) * 40).toFixed(2)}px`);
      el.style.setProperty("--ty1", `${((cy - 0.5) * 40).toFixed(2)}px`);
      el.style.setProperty("--tx2", `${((0.5 - cx) * 60).toFixed(2)}px`);
      el.style.setProperty("--ty2", `${((0.5 - cy) * 60).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      ty = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove as any);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // Cursor-following glow
        background:
          "radial-gradient(600px at var(--mx,50%) var(--my,50%), hsl(172 66% 40% / 0.22), transparent 60%)",
      }}
    >
      {/* Parallax blobs */}
      <div
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{
          transform: "translate3d(var(--tx1,0), var(--ty1,0), 0)",
          background: "linear-gradient(135deg, hsl(256 72% 55% / 0.5), hsl(292 84% 61% / 0.5))",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-80"
        style={{
          transform: "translate3d(var(--tx2,0), var(--ty2,0), 0)",
          background: "linear-gradient(135deg, hsl(292 84% 61% / 0.45), hsl(333 79% 58% / 0.45))",
        }}
      />
    </div>
  );
}
