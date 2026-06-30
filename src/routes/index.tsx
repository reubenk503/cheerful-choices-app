import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/coaching.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
  component: ScreenFrame,
});

function ScreenFrame() {
  return (
    <iframe
      srcDoc={html}
      title="Agota Csaszar - Coaching"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
