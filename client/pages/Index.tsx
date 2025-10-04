import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CloudBackground from "@/components/visuals/CloudBackground";

import PageTransition from "@/components/animation/PageTransition";
import Reveal from "@/components/animation/Reveal";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";

export default function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const skills = [
    {
      title: "Java & Spring Boot",
      desc: "REST APIs, authentication, and robust services",
    },
    {
      title: "Database Design",
      desc: "MySQL schemas, joins, indexing, and migrations",
    },
    {
      title: "Frontend Engineering",
      desc: "React components, state, and responsive UI",
    },
  ];

  const laptopMenu = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <PageTransition>
      <main>
        <section className="relative overflow-hidden">
          <CloudBackground />
          <div className="container mx-auto min-h-[calc(100vh-4rem)] grid place-items-center py-16">
            <div className="text-center max-w-3xl">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  Java Developer • Spring Boot • MySQL • React
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  Building clean, scalable full‑stack apps in Java
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-4 text-muted-foreground text-lg">
                  I’m Dhanus Mani S — a Java developer crafting robust APIs with
                  Spring Boot and intuitive UIs with React. Quick learner,
                  production mindset, and a passion for performance.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Button asChild size="lg">
                    <Link to="/projects">See Projects</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/about">About Me</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold">Career Objective</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              Recent ECE graduate seeking a Java Developer or Full Stack role to
              apply and grow my skills. Experienced with building real-world
              applications, contributing to both frontend and backend logic, and
              maintaining clean, scalable code.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal key={s.title} delay={0.06 * i}>
                <div className="rounded-xl border p-5 bg-card">
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-16">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Highlighted Projects
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Production-ready systems for academic results and retail billing,
                showcasing Spring Boot services, MySQL data models, and polished React UIs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6">
              <ProjectShowcase
                title="Result Management System"
                description="Admin, Teachers, and Students portals with authentication, CRUD operations, and secure result viewing. Spring Boot APIs + MySQL + React frontend."
                href="https://result-app-latest.onrender.com/"
                iframeSrc="https://result-app-latest.onrender.com/"
              />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10">
              <ProjectShowcase
                title="Retail Billing (POS) System"
                description="Inventory and billing dashboards with role-based access, Razorpay integration, invoice workflows, and analytics powered by Spring Boot, MySQL, and React."
                href="https://symphonious-seahorse-1e94dc.netlify.app/"
                iframeSrc="https://symphonious-seahorse-1e94dc.netlify.app/"
              />
            </div>
          </Reveal>
        </section>
      </main>
    </PageTransition>
  );
}
