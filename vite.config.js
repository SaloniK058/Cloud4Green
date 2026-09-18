// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { fileURLToPath, URL } from "node:url";

/**
 * The dev server runs over HTTPS with a self-signed certificate. Expect a
 * browser warning on first visit each session — click through it.
 *
 * It is not decoration. The Microsoft Bookings embed on /contact is served with
 * `Content-Security-Policy: frame-ancestors https:`, a scheme-source that
 * admits any HTTPS origin and refuses every HTTP one, http://localhost very
 * much included. On a plain HTTP dev server that calendar is blocked outright
 * while working perfectly in production — a failure that shows up only where
 * you develop and never where you deploy, which is the worst way round. Serving
 * dev over TLS costs one click and keeps local behaviour honest.
 *
 * This affects local development only. Netlify builds with `vite build` and
 * serves the output over its own certificate; the dev server never runs there.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    basicSsl(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});