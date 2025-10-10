import { useRef } from "react";
import html2pdf from "html2pdf.js";
import PageTransition from "@/components/animation/PageTransition";

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);

  function onDownload() {
    if (!ref.current) return;
    const opt = {
      margin: 0.5,
      filename: "DHANUS_Resume_Full.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    } as const;
    html2pdf().set(opt).from(ref.current).save();
  }

  return (
    <PageTransition>
      <main className="container mx-auto py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume</h1>
          <button
            onClick={onDownload}
            className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-400"
          >
            Download PDF
          </button>
        </div>

        <div
          ref={ref}
          className="mt-6 mx-auto w-full max-w-3xl rounded-lg bg-white p-8 text-slate-900 shadow-sm print:shadow-none"
          style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system" }}
        >
          <style>{`
            /* Ensure clean page breaks for PDF */
            .page-section { page-break-inside: avoid; }
            .section-title { font-weight: 700; }
            .item { break-inside: avoid; page-break-inside: avoid; }
          `}</style>

          <header className="border-b pb-4 page-section">
            <h2 className="text-3xl font-extrabold tracking-tight">DHANUS MANI S</h2>
            <p className="mt-1 text-sm">Full Stack Java Developer</p>
            <div className="mt-2 text-sm text-slate-600">
              <span className="mr-3">dhanusmani43@gmail.com</span>
              <a href="https://dhanusportfolio.netlify.app" className="text-emerald-600 underline">
                dhanusportfolio.netlify.app
              </a>
            </div>
          </header>

          <section className="mt-6 page-section">
            <h3 className="section-title text-lg">Personal Information</h3>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li><span className="font-medium">Name:</span> DHANUS MANI S</li>
              <li><span className="font-medium">Role:</span> Full Stack Java Developer</li>
              <li><span className="font-medium">Education:</span> BE, PSV College of Engineering and Technology, 2025</li>
              <li><span className="font-medium">Contact:</span> dhanusmani43@gmail.com</li>
              <li>
                <span className="font-medium">Portfolio:</span> 
                <a href="https://dhanusportfolio.netlify.app" className="ml-1 text-emerald-600 underline">dhanusportfolio.netlify.app</a>
              </li>
            </ul>
          </section>

          <section className="mt-6 page-section">
            <h3 className="section-title text-lg">Summary</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Enthusiastic developer skilled in building full-stack applications, deploying projects
              with Docker, integrating APIs, and solving real-world problems with technology.
            </p>
          </section>

          <section className="mt-6 page-section">
            <h3 className="section-title text-lg">Skills</h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-700">
              <li>Java</li>
              <li>Spring Boot</li>
              <li>MySQL</li>
              <li>Docker</li>
              <li>React/Vite</li>
              <li>API integration</li>
            </ul>
          </section>

          <section className="mt-6 page-section" data-html2pdf-pagebreak="{ &quot;before&quot;: &quot;always&quot; }">
            <h3 className="section-title text-lg">Projects</h3>
            <div className="mt-2 space-y-4 text-sm text-slate-700">
              <div className="item">
                <p className="font-medium">Billing Software</p>
                <p className="text-slate-600">
                  Developed a full stack billing software using Java Spring Boot and React. Implemented
                  invoice creation, customer management, and reporting with secure REST APIs and MySQL.
                </p>
              </div>
              <div className="item">
                <p className="font-medium">Result Management System</p>
                <p className="text-slate-600">
                  Created a system to manage student results efficiently with Java and MySQL, including
                  role-based access, data validation, and exportable reports.
                </p>
              </div>
              <div className="item">
                <p className="font-medium">AI Chatbot Gemini</p>
                <p className="text-slate-600">
                  Built an AI-based chatbot application integrating NLP for user queries, focusing on
                  intent detection, conversation flow, and API integrations.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 page-section">
            <h3 className="section-title text-lg">Education</h3>
            <p className="mt-2 text-sm text-slate-700">
              BE, PSV College of Engineering and Technology, 2025
            </p>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}


