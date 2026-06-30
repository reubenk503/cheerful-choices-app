import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/book.html?raw";

export const Route = createFileRoute("/book")({
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
      title="Book a Call"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
