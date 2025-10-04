import { Button } from "@/components/ui/button";

const Card = ({
  title,
  description,
  children,
  link,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => (
  <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
    <div className="aspect-video bg-muted/40">{children}</div>
    <div className="p-5 space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {link && (
        <Button asChild>
          <a href={link} target="_blank" rel="noreferrer">
            Open App
          </a>
        </Button>
      )}
    </div>
  </div>
);

export default function Projects() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Selected Projects
      </h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Real-world, full-stack applications built with Java, Spring Boot, MySQL,
        and modern React.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card
          title="Result Management System"
          description="Admin/Teacher/Student roles with secure login, CRUD, marks update, and results view. Spring Boot APIs + MySQL backend."
          link="https://result-app-latest.onrender.com/"
        >
          <iframe
            title="Result App"
            src="https://result-app-latest.onrender.com/"
            className="w-full h-full pointer-events-none grayscale-[30%] contrast-75"
          />
        </Card>

        <Card
          title="Retail Billing (POS) System"
          description="Product/catalog CRUD, customer selection, checkout, invoice generation, Razorpay integration, role-based access, and analytics dashboards. React + Spring Boot + MySQL."
          link="https://symphonious-seahorse-1e94dc.netlify.app/"
        >
          <iframe
            title="Retail Billing POS"
            src="https://symphonious-seahorse-1e94dc.netlify.app/"
            className="w-full h-full pointer-events-none grayscale-[15%] contrast-[1.05]"
          />
        </Card>
      </div>
    </main>
  );
}
