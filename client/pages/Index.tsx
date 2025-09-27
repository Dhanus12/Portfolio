import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CloudBackground from "@/components/visuals/CloudBackground";

import PageTransition from "@/components/animation/PageTransition";
import Reveal from "@/components/animation/Reveal";

export default function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const skills = [
    { title: "Java & Spring Boot", desc: "REST APIs, authentication, and robust services" },
    { title: "Database Design", desc: "MySQL schemas, joins, indexing, and migrations" },
    { title: "Frontend Engineering", desc: "React components, state, and responsive UI" },
  ];

  return (
    <PageTransition>
    <main>
      <section className="relative overflow-hidden">
        <CloudBackground />
        <div className="container mx-auto min-h-[calc(100vh-4rem)] grid place-items-center py-16">
          <div className="text-center max-w-3xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">Java Developer • Spring Boot • MySQL • React</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Building clean, scalable full‑stack apps in Java
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-muted-foreground text-lg">I’m Dhanus Mani S — a Java developer crafting robust APIs with Spring Boot and intuitive UIs with React. Quick learner, production mindset, and a passion for performance.</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button asChild size="lg"><Link to="/projects">See Projects</Link></Button>
                <Button asChild size="lg" variant="secondary"><Link to="/about">About Me</Link></Button>
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
          <p className="mt-3 text-muted-foreground max-w-3xl">Recent ECE graduate seeking a Java Developer or Full Stack role to apply and grow my skills. Experienced with building real-world applications, contributing to both frontend and backend logic, and maintaining clean, scalable code.</p>
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
        <div className="rounded-2xl border p-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
                <h3 className="text-2xl font-bold">Result Management System</h3>
                <p className="mt-2 text-sm text-white/90">Role-based access (Admin/Teacher/Student), CRUD, secure results. Spring Boot + MySQL + React.</p>
                <div className="mt-4">
                  <Button asChild variant="secondary">
                    <a href="/projects">Explore Projects</a>
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                {mounted && (
                  <iframe title="Result App" src="https://result-app-latest.onrender.com/" className="w-full h-64 md:h-72 bg-white pointer-events-none" />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
    </PageTransition>
  );
}
