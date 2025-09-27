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
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative grid gap-6 md:grid-cols-2 items-center rounded-2xl border bg-white/50 dark:bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="p-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground">
            Featured Project
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4">
            <Button asChild>
              <a href={href} target="_blank" rel="noreferrer">Open App</a>
            </Button>
          </div>
        </div>
        <div className="relative p-4">
          <div className="relative rounded-xl border bg-background overflow-hidden shadow-2xl">
            <div className="flex items-center gap-1 px-3 py-2 border-b bg-muted/50">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-muted-foreground truncate">{title}</span>
            </div>
            <div className="relative">
              <iframe
                title={title}
                src={iframeSrc}
                className="w-full h-64 md:h-72 bg-white pointer-events-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-emerald-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
