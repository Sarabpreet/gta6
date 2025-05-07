import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    '@nuxtjs/color-mode',
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/strapi",
  ],
  vite: {
    plugins: [tailwindcss()],
  },

  ui: {
    colors: {
      primary: "blue",
      neutral: "zinc",
    },
  },
  

  colorMode: {
    classSuffix: "",
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    
  },
  tailwindcss: {
    // This is important if you are using Tailwind CSS v3+ with @nuxtjs/tailwindcss
    // and want to use the 'dark:' variants based on the class set by @nuxtjs/color-mode
    config: {
      darkMode: 'class', // or 'media' if you prefer OS-level preference
      // ... any other tailwind config
    }
  },
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    token: process.env.STRAPI_TOKEN || undefined,
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },
});
