// Load the TypeScript sitemap generator through Vite so it uses the same
// module resolution and asset handling as the application on every platform.
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
});

try {
  await vite.ssrLoadModule("/scripts/generate-sitemap.ts");
} finally {
  await vite.close();
}
