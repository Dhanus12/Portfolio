import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  href: string;
  iframeSrc: string;
}

export default function ProjectShowcase({ title, description, href, iframeSrc }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const max = 8; // deg
    setRy((px - 0.5) * max * 2);
    setRx(-(py - 0.5) * max * 2);
  }
  function onLeave() {
    setRx(0);
    setRy(0);
  }

  return (
    <div className="relative">
      {/* Outside: animated gradient ring + glow */}
      <div className="absolute -inset-[2px] -z-10 rounded-[26px] opacity-60">
        <div className="absolute inset-0 rounded-[26px] bg-[conic-gradient(from_0deg,theme(colors.cyan.400/.3),theme(colors.sky.400/.3),theme(colors.emerald.400/.3),theme(colors.cyan.400/.3))] blur-xl animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-[2px] rounded-[24px] bg-white/50 dark:bg-white/5 backdrop-blur-xl" />
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative grid gap-6 md:grid-cols-2 items-center rounded-2xl border border-white/30 dark:border-white/10 bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl shadow-2xl overflow-hidden"
        style={{
          transform: `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Inside: content panel */}
        <div className="p-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:-translate-x-1 md:group-hover:-translate-y-0.5 md:group-hover:scale-[0.99] min-h-[18rem]">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-white/10 px-3 py-1 text-xs text-muted-foreground">
            Featured Project
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 flex items-center gap-3">
            <Button asChild>
              <a href={href} target="_blank" rel="noreferrer">Open App</a>
            </Button>
            <div className="hidden md:flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 px-2 py-1">React</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-1">Spring Boot</span>
              <span className="rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 px-2 py-1">MySQL</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground md:transition md:duration-300 md:group-hover:opacity-0">Hover to preview</p>
        </div>

        {/* Inside: framed preview */}
        <div className="relative p-4">
          <div className="relative md:opacity-0 md:group-hover:opacity-100 md:transition md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-1">
            {/* Circular preview with animated gradient ring */}
            <div className="relative grid place-items-center">
              <div className="relative h-64 w-64 md:h-80 md:w-80">
                {/* outer animated ring */}
                <div className="absolute -inset-1 rounded-2xl md:transition-all md:duration-500 md:group-hover:rounded-full blur-md opacity-70" style={{ background: "conic-gradient(from 0deg, rgba(34,211,238,0.45), rgba(16,185,129,0.45), rgba(56,189,248,0.45), rgba(34,211,238,0.45))" }} />
                <div className="absolute inset-0 rounded-2xl md:transition-all md:duration-500 md:group-hover:rounded-full p-[2px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.25))" }}>
                  <div className="relative h-full w-full rounded-2xl md:transition-all md:duration-500 md:group-hover:rounded-full overflow-hidden bg-white">
                    <iframe title={title} src={iframeSrc} className="h-full w-full bg-white pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:scale-95 md:group-hover:scale-100" />
                    {/* glass shine */}
                    <div className="pointer-events-none absolute -top-8 left-0 right-0 h-24 rotate-6 bg-gradient-to-b from-white/60 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Outer hover glow */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-cyan-400/25 via-sky-400/15 to-emerald-400/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
