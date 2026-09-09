import { createFileRoute } from "@tanstack/react-router";

const TO = "agotacsreg@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

type Payload = {
  subject?: string;
  text?: string;
  name?: string;
  email?: string;
};

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

function createRawEmail(to: string, subject: string, body: string, replyTo?: string) {
  const lines = [
    `To: ${to}`,
    `Subject: ${header(subject)}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ];
  return b64(lines.join("\r\n")).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const Route = createFileRoute("/api/public/booking-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: Payload;
        try {
          payload = (await request.json()) as Payload;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const subject = (payload.subject ?? "").toString().slice(0, 200).trim();
        const text = (payload.text ?? "").toString().slice(0, 5000).trim();
        const replyTo = (payload.email ?? "").toString().slice(0, 200).trim();
        if (!subject || !text) return new Response("Missing fields", { status: 400 });

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
        if (!lovableKey || !gmailKey) {
          // No mailbox connected yet — the browser falls back to the visitor's email app.
          return new Response("Email sending is not configured", { status: 503 });
        }

        const raw = createRawEmail(
          TO,
          subject,
          text,
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(replyTo) ? replyTo : undefined,
        );

        const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": gmailKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({ raw }),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Gmail send failed [${response.status}]: ${errorBody}`);
          return new Response(`Send failed [${response.status}]`, { status: 502 });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
