import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/testimonials.html?raw";

export const Route = createFileRoute("/testimonials")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
