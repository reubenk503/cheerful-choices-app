import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/testimonials.html?raw";

export const Route = createFileRoute("/testimonials")({
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
      srcDoc={html.replace(/<head>/i, "<head><base target=\"_top\">")}
      title="Testimonials"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
