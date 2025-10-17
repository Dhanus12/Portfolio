import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Code2, Database, Server } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PageTransition from "@/components/animation/PageTransition";
import Reveal from "@/components/animation/Reveal";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";
import { Button } from "@/components/ui/button";
import VantaCloudsBackground from "@/components/visuals/VantaCloudsBackground";
import MusicControl from "@/components/animation/MusicControl";

interface SkillHighlight {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export default function Index() {
  const heroRef = useRef<HTMLElement | null>(null);

  // Auto-scroll: on entry go top → bottom → back to hero top
  useEffect(() => {
    let started = false;
    let reversed = false;
    let rafId: number | null = null;
    let fallbackId: number | null = null;

    const reverseUp = () => {
      if (reversed) return;
      reversed = true;
      if (heroRef.current) {
        heroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const monitorDown = () => {
      if (!started || reversed) return;
      const scrollEl = document.scrollingElement || document.documentElement;
      const targetY = scrollEl.scrollHeight - window.innerHeight;
      const atBottom = window.scrollY >= targetY - 2;
      if (atBottom) {
        reverseUp();
        return;
      }
      rafId = window.requestAnimationFrame(monitorDown);
    };

    const startDown = () => {
      const scrollEl = document.scrollingElement || document.documentElement;
      const targetY = scrollEl.scrollHeight - window.innerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      started = true;
      rafId = window.requestAnimationFrame(monitorDown);
      // Fallback: reverse even if bottom detection fails due to content shifts
      fallbackId = window.setTimeout(reverseUp, 5000);
    };

    const delayId = window.setTimeout(startDown, 800);

    return () => {
      window.clearTimeout(delayId);
      if (fallbackId !== null) window.clearTimeout(fallbackId);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);
  const skillHighlights: SkillHighlight[] = [
    {
      title: "Backend APIs",
      desc: "Secure Spring Boot services with clean architecture and JWT auth.",
      icon: Server,
    },
    {
      title: "Data Modeling",
      desc: "Normalised MySQL schemas, query tuning, and migration strategies.",
      icon: Database,
    },
    {
      title: "Frontend Craft",
      desc: "Responsive React interfaces with smooth UX and accessibility.",
      icon: Code2,
    },
  ];

  const toolkit = [
    "Spring Boot",
    "React",
    "MySQL",
    "Tailwind CSS",
    "REST/JSON",
    "Gemini API",
  ];

  const achievements = [
    {
      value: "3+",
      label: "Full-stack apps",
      detail: "Shipped for academics and small businesses",
    },
    {
      value: "20+",
      label: "API endpoints",
      detail: "Designed with caching & validation",
    },
    {
      value: "4.9/5",
      label: "Reviews",
      detail: "From mentors and project partners",
    },
  ];

  const laptopMenu = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const featuredProjects = [
    {
      title: "Retail Billing (POS) System",
      description:
        "Inventory and billing dashboards with role-based access, Razorpay integration, invoice workflows, and analytics powered by Spring Boot, MySQL, and React.",
      tools: ["Spring Boot", "Java", "MySQL", "React", "TailwindCSS"],
      href: "https://symphonious-seahorse-1e94dc.netlify.app/",
      iframeSrc: "https://symphonious-seahorse-1e94dc.netlify.app/",
    },
    {
      title: "Result Management System",
      description:
        "Admin, Teachers, and Students portals with authentication, CRUD operations, and secure result viewing. Spring Boot APIs + MySQL + React frontend.",
      tools: ["Spring Boot", "Java", "MySQL", "React", "JWT"],
      href: "https://result-app-latest.onrender.com/",
      iframeSrc: "https://result-app-latest.onrender.com/",
    },
    {
      title: "Gemini AI Chat Assistant",
      description:
        "Conversational AI assistant powered by Google Gemini with a React UI and Spring Boot backend proxying secure requests for contextual responses and history.",
      tools: ["React", "TypeScript", "Spring Boot", "Gemini API"],
      href: "https://snazzy-rabanadas-6dac57.netlify.app/",
      iframeSrc: "https://snazzy-rabanadas-6dac57.netlify.app/",
    },
  ];

  // Rotating project overview content (5s interval)
  const overviewProjects = useMemo(
    () =>
      featuredProjects.map((p) => ({
        title: p.title,
        description: p.description,
        tools: (p as any).tools as string[] | undefined,
      })),
    [],
  );
  const [overviewIndex, setOverviewIndex] = useState<number>(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setOverviewIndex((i) => (i + 1) % overviewProjects.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [overviewProjects.length]);

  return (
    <PageTransition>
      <main>
        <section ref={(el) => (heroRef.current = el)} className="relative overflow-hidden text-slate-100 [overflow-anchor:none] min-h-screen scroll-mt-16 md:scroll-mt-20" id="home-hero">
          <VantaCloudsBackground />
          <MusicControl />
          <div className="container relative z-10 mx-auto flex flex-col gap-12 py-20 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-8 text-center lg:text-left">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs uppercase tracking-wide text-slate-100/80 backdrop-blur">
                    <span>Full-stack Java Engineer</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Open to opportunities</span>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Crafting resilient Spring Boot APIs with delightful React UIs
                  </h1>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-lg text-slate-100/85">
                    I build production-ready features end-to-end—from designing database schemas and secured services to delivering pixel-perfect web experiences that feel effortless.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <Button asChild size="lg">
                      <Link to="/projects">View Recent Work</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      <Link to="/contact">Book a chat</Link>
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.32}>
                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {toolkit.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100/80 backdrop-blur"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-cyan-400/30 via-transparent to-emerald-400/30 blur-3xl" />
                  <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                      Project overview
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={overviewIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3 className="mt-3 text-2xl font-semibold">
                          {overviewProjects[overviewIndex].title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-100/75">
                          {overviewProjects[overviewIndex].description}
                        </p>
                        {overviewProjects[overviewIndex].tools && (
                          <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {overviewProjects[overviewIndex].tools!.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100/80 backdrop-blur"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-6 flex items-center justify-center gap-2">
                      {overviewProjects.map((_, i) => (
                        <span
                          key={i}
                          className={
                            i === overviewIndex
                              ? "h-2 w-2 rounded-full bg-cyan-400"
                              : "h-2 w-2 rounded-full bg-white/20"
                          }
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.36}>
              <div className="grid gap-4 sm:grid-cols-3">
                {achievements.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur lg:text-left"
                  >
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm font-medium text-slate-100/85">
                      {item.label}
                    </div>
                    <p className="mt-2 text-xs text-slate-100/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-emerald-500/10 to-cyan-500/10 dark:from-slate-900/40 dark:via-slate-950/40 dark:to-slate-900/40"
            aria-hidden="true"
          />
          <div className="container relative z-10 mx-auto">
            <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)]">
              <Reveal>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Engineer with a product mindset
                  </h2>
                  <p className="text-muted-foreground">
                    From ideation to release, I optimise delivery pipelines, document decisions, and
                    ensure the solutions scale with your roadmap.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Automated testing hooks, monitoring, and observability baked in.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                      <span>Readable PRs and architecture notes for effortless team handovers.</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
              <div className="grid gap-6 md:grid-cols-3">
                {skillHighlights.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <Reveal key={skill.title} delay={0.06 * index}>
                      <div className="rounded-2xl border border-slate-200/20 bg-white/80 p-6 text-left shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <Icon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
                        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                          {skill.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-200/80">
                          {skill.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16 [overflow-anchor:none]">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Highlighted Projects
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Retail automation, academic results, and AI assistance—each project pairs
                Spring Boot services, MySQL data models, and polished React interfaces.
              </p>
            </div>
          </Reveal>
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={0.08 * (index + 1)}>
              <div className={index === 0 ? "mt-6" : "mt-10"}>
                <ProjectShowcase {...project} />
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </PageTransition>
  );
}
