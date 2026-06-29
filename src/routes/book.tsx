import { createFileRoute } from "@tanstack/react-router";
import html from "../screens/book.html?raw";

export const Route = createFileRoute("/book")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
