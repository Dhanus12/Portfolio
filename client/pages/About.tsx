export default function About() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">Java developer with hands-on experience building full-stack applications using Spring Boot, MySQL, and React.</p>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-semibold text-xl">Summary</h2>
          <p className="mt-2 text-sm text-muted-foreground">Recent ECE graduate with strong skills in Java, Spring Boot, MySQL, and web development. Built production-like apps and contributed across frontend and backend. Passionate about clean, scalable code.</p>
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
          <p><span className="font-medium text-foreground">Full Stack Web Development Intern</span> — Bright Greeks Software Solutions, Bangalore</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Developed frontend login systems and full-stack integration.</li>
            <li>Built role-based app for Admin, Teachers, and Students with CRUD and results features.</li>
            <li>Spring Boot APIs + MySQL; improved bug resolution by 20% via standards.</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-xl">Education</h2>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          <li><span className="font-medium text-foreground">B.E. ECE</span> — P.S.V. College of Engineering and Technology (2021-2025) — CGPA 7.8</li>
          <li>Syed Ammal Hr. Sec. School — HSC</li>
          <li>Syed Ammal Hr. Sec. School — SSLC</li>
        </ul>
      </section>
    </main>
  );
}
