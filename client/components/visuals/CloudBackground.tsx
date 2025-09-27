import { useEffect, useRef } from "react";

interface CloudSpec {
  x: number; // 0..1 base x
  y: number; // 0..1 base y
  size: number; // px of the main blob
  drift: number; // speed multiplier
  parallax: number; // how much it follows mouse position
  opacity: number; // 0..1
}

const CLOUDS: CloudSpec[] = [
  { x: 0.15, y: 0.18, size: 380, drift: 0.35, parallax: 22, opacity: 0.65 },
  { x: 0.75, y: 0.22, size: 460, drift: 0.25, parallax: 28, opacity: 0.6 },
  { x: 0.48, y: 0.48, size: 520, drift: 0.3, parallax: 26, opacity: 0.58 },
  { x: 0.22, y: 0.72, size: 420, drift: 0.28, parallax: 30, opacity: 0.6 },
  { x: 0.82, y: 0.7, size: 560, drift: 0.22, parallax: 24, opacity: 0.55 },
];

export default function CloudBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Per-cloud drifting offsets
    const offsets = CLOUDS.map(() => ({ x: 0, y: 0 }));

    let raf = 0;
    let t = 0;
    let cx = 0.5;
    let cy = 0.5;
    let tx = 0.5;
    let ty = 0.5;

    // Pointer velocity (direction-based)
    let vX = 0; // px/frame
    let vY = 0; // px/frame
    let lastMoveAt = 0;
    let lastX = -1;
    let lastY = -1;

    const clampWrap = (n: number, range: number) => {
      if (n > range) return n - range * 2;
      if (n < -range) return n + range * 2;
      return n;
    };

    const tick = () => {
      t += 0.004;

      // Smooth cursor target -> current
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;

      // Expose cursor position for CSS radial glow
      el.style.setProperty("--mx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(2)}%`);

      // If no recent movement, drift straight to the right
      const now = performance.now();
      const idle = now - lastMoveAt > 160;
      const targetVX = idle ? 0.6 : vX;
      const targetVY = idle ? 0.0 : vY;

      // Apply friction and ease towards target
      vX += (targetVX - vX) * 0.06;
      vY += (targetVY - vY) * 0.06;
      vX *= 0.985;
      vY *= 0.985;

      CLOUDS.forEach((c, i) => {
        // Gentle sine wobble for softness
        const wobbleX = Math.sin(t * (1 + c.drift) + i) * 3;
        const wobbleY = Math.cos(t * (0.8 + c.drift) + i * 0.5) * 2;

        // Update offsets following pointer direction or straight when idle
        offsets[i].x = clampWrap(offsets[i].x + (vX * c.drift + wobbleX), 600);
        offsets[i].y = clampWrap(offsets[i].y + (vY * c.drift + wobbleY), 600);

        // Mild parallax to cursor position
        const mousePX = (cx - 0.5) * c.parallax;
        const mousePY = (cy - 0.5) * c.parallax;

        // The first child is the sky, so clouds start from index 1
        const cloud = el.children[i + 1] as HTMLElement | undefined;
        if (cloud) {
          cloud.style.transform = `translate3d(${offsets[i].x + mousePX}px, ${offsets[i].y + mousePY}px, 0)`;
        }
      });

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const my = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      tx = mx;
      ty = my;

      // Directional velocity from pointer delta
      if (lastX >= 0 && lastY >= 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        // Normalize and scale
        const len = Math.hypot(dx, dy) || 1;
        const speed = Math.min(1.0, len / 12); // cap influence
        const dirX = (dx / len) * 2.2 * speed; // px/frame base
        const dirY = (dy / len) * 2.2 * speed;
        // Smooth towards new direction
        vX += (dirX - vX) * 0.25;
        vY += (dirY - vY) * 0.25;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveAt = performance.now();

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
    >
      {/* Sky layer behind clouds (light blue) */}
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
            // Brighter bluish-white cloud body
            background:
              `radial-gradient(closest-side at 42% 40%, hsla(200, 40%, 99%, ${Math.min(1, c.opacity + 0.25)}) 0 60%, transparent 72%),` +
              `radial-gradient(closest-side at 60% 55%, hsla(200, 40%, 98%, ${Math.min(1, c.opacity + 0.2)}) 0 58%, transparent 72%),` +
              `radial-gradient(closest-side at 35% 60%, hsla(200, 40%, 97%, ${Math.min(1, c.opacity + 0.18)}) 0 52%, transparent 72%),` +
              `radial-gradient(closest-side at 55% 38%, hsla(200, 70%, 90%, ${c.opacity * 0.7}) 0 40%, transparent 62%)`,
            filter:
              "blur(2.5px) drop-shadow(0 10px 28px hsla(200, 60%, 70%, 0.18))",
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
            "radial-gradient(900px at var(--mx,50%) var(--my,50%), hsl(200 90% 88% / 0.45), transparent 60%)",
        }}
      />
    </div>
  );
}
