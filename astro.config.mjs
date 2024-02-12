import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), auth()],
  output: "server",
  adapter: vercel(),
});
