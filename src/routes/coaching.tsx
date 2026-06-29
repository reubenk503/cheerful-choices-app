import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/coaching.html?raw";

export const Route = createFileRoute("/coaching")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
