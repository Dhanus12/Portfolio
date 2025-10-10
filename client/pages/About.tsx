import InteractiveBackground from "@/components/visuals/InteractiveBackground";
import PageTransition from "@/components/animation/PageTransition";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

export default function About() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_08todac";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!templateId || !publicKey) {
        // Fallback to server endpoint if EmailJS not configured
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to send");
        setStatus("Message sent successfully!");
        form.reset();
        return;
      }

      const { name, email, message } = data as Record<string, string>;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
        },
        {
          publicKey,
        },
      );
      setStatus("Message sent successfully!");
      form.reset();
    } catch (err: any) {
      setStatus(err.message || "Could not send message. Configure email.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <PageTransition>
      <section className="relative">
        <InteractiveBackground />
        <main className="container mx-auto py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            About
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Java developer with hands-on experience building full-stack
            applications using Spring Boot, MySQL, and React.
          </p>

          <section className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-semibold text-xl">Summary</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Recent ECE graduate with strong skills in Java, Spring Boot,
                MySQL, and web development. Built production-like apps and
                contributed across frontend and backend. Passionate about clean,
                scalable code.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-xl">Skills</h2>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li>Core Java</li>
                <li>Spring Boot</li>
                <li>REST APIs</li>
                <li>MySQL</li>
                <li>React.js</li>
                <li>HTML/CSS/JS</li>
                <li>Bootstrap</li>
                <li>Git & VS Code</li>
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-semibold text-xl">Experience</h2>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Full Stack Web Development Intern
                </span>{" "}
                — Bright Greeks Software Solutions, Bangalore
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Developed frontend login systems and full-stack integration.
                </li>
                <li>
                  Built role-based app for Admin, Teachers, and Students with
                  CRUD and results features.
                </li>
                <li>
                  Spring Boot APIs + MySQL; improved bug resolution by 20% via
                  standards.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-semibold text-xl">Education</h2>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">B.E. ECE</span> —
                P.S.V. College of Engineering and Technology (2021-2025) — CGPA
                7.8
              </li>
              <li>Syed Ammal Hr. Sec. School — HSC</li>
              <li>Syed Ammal Hr. Sec. School — SSLC</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-semibold text-xl">Send me a message</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              This will be delivered to my inbox.
            </p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium">Your name</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                <a
                  href="mailto:dhanusmani43@gmail.com"
                  className="text-sm text-primary underline"
                >
                  or email directly
                </a>
              </div>
              {status && (
                <p className="text-sm text-muted-foreground">{status}</p>
              )}
            </form>
          </section>
        </main>
      </section>
    </PageTransition>
  );
}
