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

      CLOUDS.forEach((c, i) => {
        const angle = t * (1 + c.drift) + i;
        const driftX = Math.sin(angle) * 12;
        const driftY = Math.cos(angle * 0.9) * 8;
        const mouseX = (cx - 0.5) * c.parallax;
        const mouseY = (cy - 0.5) * c.parallax;
        const cloud = el.children[i] as HTMLElement | undefined;
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
      {CLOUDS.map((c, idx) => (
        <div
          key={idx}
          className="absolute will-change-transform"
          style={{
            left: `calc(${c.x * 100}% - ${c.size / 2}px)`,
            top: `calc(${c.y * 100}% - ${c.size / 2}px)`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            // Cloud made by layered radial-gradients with soft cyan tint
            background:
              `radial-gradient(closest-side at 42% 40%, hsla(0,0%,100%,${c.opacity}) 0 60%, transparent 70%),` +
              `radial-gradient(closest-side at 60% 55%, hsla(0,0%,100%,${c.opacity * 0.9}) 0 58%, transparent 70%),` +
              `radial-gradient(closest-side at 35% 60%, hsla(0,0%,100%,${c.opacity * 0.85}) 0 52%, transparent 70%),` +
              `radial-gradient(closest-side at 55% 38%, hsla(180,70%,88%,${c.opacity * 0.45}) 0 38%, transparent 62%)`,
            filter: "blur(2px)",
          }}
        />
      ))}
      {/* Subtle sky tint */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsla(190, 45%, 96%, 0.9), hsla(190, 60%, 94%, 0.8))",
      }} />
    </div>
  );
}
