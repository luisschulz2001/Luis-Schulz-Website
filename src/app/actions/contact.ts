"use server";

import { Resend } from "resend";
import { getSettings } from "@/lib/content";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" };

const topics = ["coaching", "partners", "press", "general"] as const;
type Topic = (typeof topics)[number];

/**
 * Empfänger je Anliegen. Standard sind die Adressen aus den CMS-Einstellungen,
 * per Umgebungsvariable (Vercel) lassen sie sich überschreiben.
 */
function recipientFor(topic: Topic) {
  const s = getSettings();
  const env = {
    coaching: process.env.CONTACT_TO_COACHING,
    partners: process.env.CONTACT_TO_PARTNERS,
    press: process.env.CONTACT_TO_PRESS,
    general: process.env.CONTACT_TO_GENERAL,
  }[topic];
  return env || s.emails[topic] || process.env.CONTACT_TO_GENERAL || s.emails.general;
}

const escape = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot gegen Spam-Bots: echtes Feld ist unsichtbar
  if (formData.get("company_website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 200);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 5000);
  const rawTopic = String(formData.get("topic") ?? "general");
  const topic: Topic = (topics as readonly string[]).includes(rawTopic) ? (rawTopic as Topic) : "general";
  const consent = formData.get("consent") === "on";

  if (!name || !message || !consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Kontaktformular: RESEND_API_KEY oder CONTACT_FROM_EMAIL fehlt.");
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: recipientFor(topic),
      replyTo: email,
      subject: `[Website · ${topic}] Nachricht von ${name}`,
      text: `Anliegen: ${topic}\nName: ${name}\nE-Mail: ${email}\n\n${message}`,
      html: `<p><strong>Anliegen:</strong> ${topic}<br/><strong>Name:</strong> ${escape(name)}<br/><strong>E-Mail:</strong> ${escape(email)}</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
    });
    if (error) {
      console.error("Kontaktformular:", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Kontaktformular:", err);
    return { status: "error" };
  }
}
