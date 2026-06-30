import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import html from "../screens/development.html?raw";

export const Route = createFileRoute("/development")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
  component: ScreenFrame,
});

function ScreenFrame() {
  useEffect(() => {
    document.open();
    document.write(html.replace(/<head>/i, "<head><base target=\"_self\">"));
    document.close();
  }, []);

  return <div style={{ minHeight: "100vh", background: "#fbf9f8" }} />;
}
