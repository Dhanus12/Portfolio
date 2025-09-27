import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setStatus("Message sent successfully!");
      form.reset();
    } catch (err: any) {
      setStatus(err.message || "Could not send message. Configure email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">Send a message and it will be delivered to my inbox once email is configured.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Your name</label>
          <input name="name" required className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea name="message" required rows={5} className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
          <a href="mailto:dhanusmani43@gmail.com" className="text-sm text-primary underline">or email directly</a>
        </div>
        {status && <p className="text-sm text-muted-foreground">{status}</p>}
      </form>
    </main>
  );
}
