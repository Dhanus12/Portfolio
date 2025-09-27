import { useEffect, useRef } from "react";

interface CloudSpec {
  x: number; // 0..1 base x
  y: number; // 0..1 base y
  size: number; // px of the main blob
  drift: number; // speed multiplier
  parallax: number; // how much it follows mouse
  opacity: number; // 0..1
}

const CLOUDS: CloudSpec[] = [
  { x: 0.15, y: 0.18, size: 360, drift: 0.35, parallax: 40, opacity: 0.5 },
  { x: 0.75, y: 0.22, size: 420, drift: 0.25, parallax: 55, opacity: 0.45 },
  { x: 0.48, y: 0.48, size: 480, drift: 0.3, parallax: 50, opacity: 0.4 },
  { x: 0.22, y: 0.72, size: 380, drift: 0.28, parallax: 60, opacity: 0.42 },
  { x: 0.82, y: 0.70, size: 520, drift: 0.22, parallax: 45, opacity: 0.38 },
];

export default function CloudBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let t = 0;
    let cx = 0.5;
    let cy = 0.5;
    let tx = 0.5;
    let ty = 0.5;

    const tick = () => {
      t += 0.005;
      // Ease cursor target -> current
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;

      // expose cursor position for CSS radial glow
      el.style.setProperty("--mx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(2)}%`);

      CLOUDS.forEach((c, i) => {
        const angle = t * (1 + c.drift) + i;
        const driftX = Math.sin(angle) * 12;
        const driftY = Math.cos(angle * 0.9) * 8;
        const mouseX = (cx - 0.5) * c.parallax;
        const mouseY = (cy - 0.5) * c.parallax;
        // first child will be sky layer, so clouds start at index 1
        const cloud = el.children[i + 1] as HTMLElement | undefined;
        if (cloud) {
          cloud.style.transform = `translate3d(${mouseX + driftX}px, ${mouseY + driftY}px, 0)`;
        }
      });

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
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Sky layer behind clouds */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(180deg, hsl(203 100% 96% / 1), hsl(203 88% 92% / 0.95))",
        }}
      />

      {CLOUDS.map((c, idx) => (
        <div
          key={idx}
          className="absolute will-change-transform"
          style={{
            zIndex: 1,
            left: `calc(${c.x * 100}% - ${c.size / 2}px)`,
            top: `calc(${c.y * 100}% - ${c.size / 2}px)`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            // Cloud made by layered radial-gradients with light blue/white tint
            background:
              `radial-gradient(closest-side at 42% 40%, hsla(200, 40%, 99%, ${Math.min(1, c.opacity + 0.2)}) 0 60%, transparent 70%),` +
              `radial-gradient(closest-side at 60% 55%, hsla(200, 40%, 98%, ${Math.min(1, c.opacity + 0.15)}) 0 58%, transparent 70%),` +
              `radial-gradient(closest-side at 35% 60%, hsla(200, 40%, 97%, ${Math.min(1, c.opacity + 0.12)}) 0 52%, transparent 70%),` +
              `radial-gradient(closest-side at 55% 38%, hsla(200, 70%, 90%, ${c.opacity * 0.6}) 0 38%, transparent 62%)`,
            filter: "blur(3px) drop-shadow(0 8px 24px hsla(200, 60%, 70%, 0.15))",
            borderRadius: "9999px",
          }}
        />
      ))}

      {/* Cursor-follow glow to lighten blue where pointer is */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(800px at var(--mx,50%) var(--my,50%), hsl(200 90% 88% / 0.35), transparent 60%)",
        }}
      />
    </div>
  );
}
