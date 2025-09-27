import { RequestHandler } from "express";

const TO_EMAIL = "dhanusmani43@gmail.com";

export const handleContact: RequestHandler = async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(501).json({
      error: "Email service not configured. Set RESEND_API_KEY to enable sending.",
    });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <noreply@yourdomain.dev>",
        to: [TO_EMAIL],
        subject: `New portfolio message from ${name}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/</g, "&lt;")}</p>`,
      }),
    });
    if (!r.ok) {
      const text = await r.text();
      return res.status(500).json({ error: `Failed to send email: ${text}` });
    }
    const data = await r.json();
    return res.status(200).json({ id: data.id || "sent" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Send failed" });
  }
};
