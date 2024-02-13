import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";
// import { loadEnv } from "vite";

// using import.meta.env also works
// but loading the env here is done so that prisma has the env vars too
// which for some reason aren't being loaded
// const env = loadEnv("production", process.cwd(), "");

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
