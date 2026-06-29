import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/development.html?raw";

export const Route = createFileRoute("/development")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
