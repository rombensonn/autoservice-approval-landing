import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-brand-primary)",
        secondary: "var(--color-brand-secondary)",
        accent: "var(--color-brand-accent)",
        neutral: "var(--color-brand-neutral)",
        page: "var(--color-bg-page)",
        section: "var(--color-bg-section)",
        surface: "var(--color-bg-surface)",
        hero: "var(--color-bg-hero)",
        footer: "var(--color-bg-footer)",
        ink: "var(--color-text-primary)",
        graphite: "var(--color-text-primary)",
        body: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        inverse: "var(--color-text-inverse)",
        "inverse-muted": "var(--color-text-inverse-muted)",
        line: "var(--color-border-default)",
        "line-strong": "var(--color-border-strong)",
        "line-inverse": "var(--color-border-inverse)",
        action: "var(--color-action-primary-bg)",
        "action-hover": "var(--color-action-primary-hover)",
        "action-soft": "var(--color-action-secondary-hover)",
        highlight: "var(--color-highlight)",
        success: "var(--color-status-active)",
        wait: "var(--color-brand-secondary)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)"
      }
    }
  },
  plugins: []
};

export default config;
