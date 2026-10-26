import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const staticRoutes = new Set(["/about", "/work-with-me", "/contact"]);
export default defineConfig({
  server: { port: 3000, host: "0.0.0.0" },
  plugins: [
    react(),
    {
      name: "preview-static-routes",
      configurePreviewServer(server) {
        // Vite's SPA fallback otherwise serves the home HTML at extensionless routes.
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url || "/", "http://localhost");
          if (staticRoutes.has(url.pathname))
            request.url = `${url.pathname}/index.html${url.search}`;
          next();
        });
      },
    },
  ],
});
